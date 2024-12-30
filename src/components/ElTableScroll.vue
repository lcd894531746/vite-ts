<template>
  <el-table
    v-bind="$attrs"
    ref="tableRef"
    class="el-table-scroll tech-theme"
    :max-height="height"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <slot></slot>
  </el-table>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted, watch, defineEmits, defineProps, withDefaults, defineExpose } from "vue";
import { ElTable } from "element-plus";

interface ScrollInfo {
  totalPages: number;
  pageHeight: number;
}

interface Props {
  height?: string | number;
  autoScroll?: boolean;
  scrollSpeed?: number;
  step?: number;
  pageMode?: boolean;
  pageInterval?: number;
}

const emit = defineEmits<{
  (e: 'startScroll'): void;
  (e: 'stopScroll'): void;
}>();

const tableRef = ref<InstanceType<typeof ElTable> | null>(null);
const isScrolling = ref<boolean>(false);
const currentPage = ref<number>(0);

const props = withDefaults(defineProps<Props>(), {
  height: 400,
  autoScroll: false,
  scrollSpeed: 100,
  step: 1,
  pageMode: false,
  pageInterval: 3000,
});

let scrollTimer: number | (() => void) | null = null;
let isHovered: boolean = false;
let isUsingAnimationFrame: boolean = false;

// 计算总页数和每页高度
const getScrollInfo = (): ScrollInfo => {
  if (!tableRef.value?.$el) return { totalPages: 0, pageHeight: 0 };
  const demo = tableRef.value.$refs.bodyWrapper?.getElementsByClassName(
    "el-scrollbar__wrap"
  )[0] as HTMLElement;
  if (!demo) return { totalPages: 0, pageHeight: 0 };

  const pageHeight = demo.clientHeight;
  const totalHeight = demo.scrollHeight;
  return {
    totalPages: Math.ceil(totalHeight / pageHeight),
    pageHeight,
  };
};

// 连续滚动模式
const continuousScroll = (demo: HTMLElement): (() => void) => {
  const tableScroll = ref<boolean>(true);
  let animationFrameId: number | null = null;
  let lastTimestamp = 0;
  let isResetting = false;
  const FRAME_INTERVAL = props.scrollSpeed;
  const RESET_DELAY = 800;

  demo.addEventListener("mouseover", () => {
    tableScroll.value = false;
  });
  demo.addEventListener("mouseout", () => {
    tableScroll.value = true;
  });

  const animate = (timestamp: number): void => {
    if (!tableScroll.value || isResetting) {
      animationFrameId = requestAnimationFrame(animate);
      return;
    }

    if (timestamp - lastTimestamp < FRAME_INTERVAL) {
      animationFrameId = requestAnimationFrame(animate);
      return;
    }

    const num = demo.scrollTop + props.step;
    const currentPosition = Math.floor(demo.clientHeight + demo.scrollTop);
    const totalHeight = Math.floor(demo.scrollHeight);

    if (currentPosition >= totalHeight) {
      isResetting = true;
      
      setTimeout(() => {
        demo.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        isResetting = false;
      }, RESET_DELAY);
    } else {
      demo.scrollTo({
        top: num,
        behavior: "smooth",
      });
    }

    lastTimestamp = timestamp;
    animationFrameId = requestAnimationFrame(animate);
  };

  animationFrameId = requestAnimationFrame(animate);

  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  };
};

// 分页滚动模式
const pageScroll = (demo: HTMLElement): void => {
  const tableScroll = ref<boolean>(true);

  demo.addEventListener("mouseover", () => {
    tableScroll.value = false;
  });
  demo.addEventListener("mouseout", () => {
    tableScroll.value = true;
  });

  scrollTimer = window.setInterval(() => {
    if (tableScroll.value) {
      const { totalPages, pageHeight } = getScrollInfo();
      if (totalPages <= 1) return;

      currentPage.value = (currentPage.value + 1) % totalPages;
      const nextPosition = currentPage.value * pageHeight;

      demo.scrollTo({
        top: nextPosition,
        behavior: "smooth",
      });
    }
  }, props.pageInterval);
};

// 开始自动滚动
const startScroll = (): void => {
  if (isHovered || !props.autoScroll) return;

  stopScroll();
  isScrolling.value = true;
  emit("startScroll");

  nextTick(() => {
    const demo = tableRef.value?.$refs.bodyWrapper?.getElementsByClassName(
      "el-scrollbar__wrap"
    )[0] as HTMLElement;
    if (!demo) return;

    if (props.pageMode) {
      isUsingAnimationFrame = false;
      pageScroll(demo);
    } else {
      isUsingAnimationFrame = true;
      scrollTimer = continuousScroll(demo);
    }
  });
};

// 停止滚动
const stopScroll = (): void => {
  if (scrollTimer) {
    if (isUsingAnimationFrame) {
      scrollTimer();
    } else {
      clearInterval(scrollTimer);
    }
    scrollTimer = null;
  }
  isScrolling.value = false;
  currentPage.value = 0;

  emit("stopScroll");
};

// 鼠标移入时暂停滚动
const handleMouseOver = (): void => {
  isHovered = true;
  stopScroll();
};

// 鼠标移出时恢复滚动
const handleMouseLeave = (): void => {
  isHovered = false;
  if (props.autoScroll) {
    startScroll();
  }
};

// 监听 autoScroll 变化
watch(
  () => props.autoScroll,
  (newVal) => {
    if (newVal) {
      startScroll();
    } else {
      stopScroll();
    }
  },
  { immediate: true }
);

// 获取当前应该在第几页
const getCurrentPageFromScroll = (scrollTop: number, pageHeight: number): number => {
  return Math.floor(scrollTop / pageHeight);
};

// 修改监听滚动事件的部分
watch(
  () => tableRef.value,
  (newVal) => {
    if (newVal) {
      const demo =
        newVal.$refs.bodyWrapper.getElementsByClassName(
          "el-scrollbar__wrap"
        )[0];

      demo?.removeEventListener("scroll", handleScroll);

      demo?.addEventListener("scroll", handleScroll);
    }
  },
  { immediate: true }
);

// 处理滚动事件
const handleScroll = (): void => {
  if (!isScrolling.value && tableRef.value) {
    const demo =
      tableRef.value.$refs.bodyWrapper.getElementsByClassName(
        "el-scrollbar__wrap"
      )[0];
    if (demo) {
      const { pageHeight } = getScrollInfo();
      currentPage.value = getCurrentPageFromScroll(demo.scrollTop, pageHeight);
    }
  }
};

// 组件卸载时清理
onUnmounted(() => {
  stopScroll();
  if (tableRef.value) {
    const demo =
      tableRef.value.$refs.bodyWrapper.getElementsByClassName(
        "el-scrollbar__wrap"
      )[0];
    demo?.removeEventListener("scroll", handleScroll);
  }
});

// 获取需要暴露的方法
const getAllTableMethods = (): void => {
  if (tableRef.value) {
    const table = tableRef.value;
    const methods = {};

    let proto = Object.getPrototypeOf(table);
    while (proto) {
      Object.getOwnPropertyNames(proto).forEach((key) => {
        if (typeof table[key] === "function" && key !== "constructor") {
          methods[key] = (...args) => table[key](...args);
        }
      });
      proto = Object.getPrototypeOf(proto);
    }

    Object.getOwnPropertyNames(table).forEach((key) => {
      if (typeof table[key] === "function") {
        methods[key] = (...args) => table[key](...args);
      }
    });

    if (table.$refs?.tableRef) {
      Object.getOwnPropertyNames(table.$refs.tableRef).forEach((key) => {
        if (typeof table.$refs.tableRef[key] === "function") {
          methods[key] = (...args) => table.$refs.tableRef[key](...args);
        }
      });
    }
  }
};

// 在组件挂载后获取并发送方法
onMounted(() => {
  // nextTick(() => {
  //   getAllTableMethods();
  // });
});

// 暴露基础方法
defineExpose({
  startScroll,
  stopScroll,
  isScrolling,
  getCurrentPage: (): number => currentPage.value,
  getTotalPages: (): number => getScrollInfo().totalPages,
  clearSelection: (): void => tableRef.value?.clearSelection(),
  toggleRowSelection: (...args: any[]): void => tableRef.value?.toggleRowSelection(...args),
  toggleAllSelection: (): void => tableRef.value?.toggleAllSelection(),
  toggleRowExpansion: (...args: any[]): void => tableRef.value?.toggleRowExpansion(...args),
  setCurrentRow: (row: any): void => tableRef.value?.setCurrentRow(row),
  clearSort: (): void => tableRef.value?.clearSort(),
  clearFilter: (columnKeys: string[]): void => tableRef.value?.clearFilter(columnKeys),
  doLayout: (): void => tableRef.value?.doLayout(),
  sort: (...args: any[]): void => tableRef.value?.sort(...args),
  getSelectionRows: (): any[] => tableRef.value?.getSelectionRows() || [],
  scrollTo: (options: ScrollToOptions): void => tableRef.value?.scrollTo(options),
  setScrollTop: (top: number): void => tableRef.value?.setScrollTop(top),
  setScrollLeft: (left: number): void => tableRef.value?.setScrollLeft(left),
});
</script>

<style scoped>
.el-table-scroll {
  width: 100%;
  overflow: hidden;
  --el-table-border-color: rgba(0, 102, 255, 0.3); /* 更亮的边框颜色 */
  --el-table-header-bg-color: rgba(0, 25, 50, 0.95); /* 稍深的表头背景 */
  --el-table-tr-bg-color: rgba(0, 25, 50, 0.7); /* 主体背景色 */
  --el-table-row-hover-bg-color: rgba(24, 63, 255, 0.15); /* 更明显的悬浮效果 */
  --el-table-bg-color: rgba(0, 25, 50, 0.7); /* 主体背景色 */
}

/* 表格整体样式 */
.tech-theme :deep(.el-table) {
  background-color: transparent;
  color: #90BEFF;
  font-size: 14px;
  box-shadow: 0 0 20px rgba(0, 102, 255, 0.1);
  border-radius: 8px; /* 添加整体圆角 */
  overflow: hidden; /* 确保内容不超出圆角 */
}

/* 表头样式 */
.tech-theme :deep(.el-table__header-wrapper th) {
  background-color: var(--el-table-header-bg-color);
  color: #00E0FF; /* 更亮的表头文字颜色 */
  font-size: 14px;
  border-bottom: 1px solid var(--el-table-border-color);
}

/* 表格单元格样式 */
.tech-theme :deep(.el-table__body-wrapper td) {
  background-color: var(--el-table-tr-bg-color);
  border-bottom: 1px solid var(--el-table-border-color);
  color: #90BEFF;
}

/* 斑马纹样式 */
.tech-theme :deep(.el-table__body tr:nth-child(even) td) {
  background-color: rgba(0, 25, 50, 0.8);
}

/* 悬浮效果 */
.tech-theme :deep(.el-table__body tr:hover td) {
  background-color: var(--el-table-row-hover-bg-color) !important;
  color: #00E0FF !important; /* 悬浮时文字颜色变亮 */
}

/* 自定义滚动条样式 */
.tech-theme :deep(.el-table__body-wrapper::-webkit-scrollbar) {
  width: 6px;
  height: 6px;
}

.tech-theme :deep(.el-table__body-wrapper::-webkit-scrollbar-thumb) {
  border-radius: 3px;
  background: #0066FF; /* 更亮的滚动条颜色 */
  box-shadow: 0 0 6px rgba(0, 102, 255, 0.5); /* 滚动条发光效果 */
}

.tech-theme :deep(.el-table__body-wrapper::-webkit-scrollbar-track) {
  border-radius: 3px;
  background: rgba(0, 102, 255, 0.1);
}

/* 表格边框样式 */
.tech-theme :deep(.el-table__inner-wrapper::before),
.tech-theme :deep(.el-table__border-left-patch) {
  background-color: var(--el-table-border-color);
}

/* 确保表格内容可以滚动，并启用平滑滚动 */
.tech-theme :deep(.el-table__body-wrapper) {
  overflow-y: auto !important;
  height: auto !important;
  scroll-behavior: smooth;
  background-color: transparent;
}

/* 固定列样式 */
.tech-theme :deep(.el-table__fixed-right),
.tech-theme :deep(.el-table__fixed) {
  background-color: var(--el-table-tr-bg-color);
}

/* 空数据样式 */
.tech-theme :deep(.el-table__empty-block) {
  background-color: rgba(0, 25, 50, 0.7);
}

.tech-theme :deep(.el-table__empty-text) {
  color: #00E0FF;
}

/* 表格边框 */
.tech-theme :deep(.el-table--border) {
  border: 1px solid var(--el-table-border-color);
  box-shadow: 0 0 15px rgba(0, 102, 255, 0.1);
  border-radius: 8px; /* 边框圆角 */
  overflow: hidden;
}

/* 表格单元格边框 */
.tech-theme :deep(.el-table--border .el-table__cell) {
  border-right: 1px solid var(--el-table-border-color);
}

/* 选中行样式 */
.tech-theme :deep(.el-table__body tr.current-row td) {
  background-color: rgba(0, 102, 255, 0.2) !important;
  color: #00E0FF !important; /* 选中行文字颜色变亮 */
}

/* 排序图标颜色 */
.tech-theme :deep(.el-table .sort-caret) {
  border-top-color: rgba(0, 224, 255, 0.5);
  border-bottom-color: rgba(0, 224, 255, 0.5);
}

.tech-theme :deep(.el-table .ascending .sort-caret.ascending) {
  border-bottom-color: #00E0FF;
}

.tech-theme :deep(.el-table .descending .sort-caret.descending) {
  border-top-color: #00E0FF;
}

/* 表头悬浮效果 */
.tech-theme :deep(.el-table__header-wrapper th:hover) {
  background-color: rgba(0, 25, 50, 1);
}

/* 添加表格单元格过渡效果 */
.tech-theme :deep(.el-table__body td) {
  transition: all 0.3s ease;
}

/* 修改表格内部包装器样式 */
.tech-theme :deep(.el-table__inner-wrapper) {
  border-radius: 8px;
  overflow: hidden;
}

/* 修改固定列样式 */
.tech-theme :deep(.el-table__fixed-right) {
  border-radius: 0 8px 8px 0; /* 右侧固定列圆角 */
  overflow: hidden;
}

.tech-theme :deep(.el-table__fixed) {
  border-radius: 8px 0 0 8px; /* 左侧固定列圆角 */
  overflow: hidden;
}

/* 修改表头第一行第一个和最后一个单元格的圆角 */
.tech-theme :deep(.el-table__header-wrapper tr:first-child th:first-child) {
  border-top-left-radius: 8px;
}

.tech-theme :deep(.el-table__header-wrapper tr:first-child th:last-child) {
  border-top-right-radius: 8px;
}

/* 修改表格体最后一行第一个和最后一个单元格的圆角 */
.tech-theme :deep(.el-table__body-wrapper tr:last-child td:first-child) {
  border-bottom-left-radius: 8px;
}

.tech-theme :deep(.el-table__body-wrapper tr:last-child td:last-child) {
  border-bottom-right-radius: 8px;
}

/* 修改空数据块的圆角 */
.tech-theme :deep(.el-table__empty-block) {
  border-radius: 0 0 8px 8px;
}
</style>
