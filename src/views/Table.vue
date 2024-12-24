<template>
  <div class="table-page">
    <h1>Table 滚动 插件</h1>
    <div class="controls">
      <el-button @click="handleClearSelection">清除选中</el-button>
      <el-switch
        v-model="isAutoScroll"
        active-text="自动滚动"
        inactive-text="停止滚动"
      />
      <el-switch
        v-model="isPageMode"
        active-text="分页模式"
        inactive-text="连续模式"
        style="margin-left: 20px"
      />
    </div>
    <el-table-scroll
      ref="tableScrollRef"
      :data="tableData"
      :height="400"
      :auto-scroll="isAutoScroll"
      :page-mode="isPageMode"
      :scroll-speed="50"
      :step="3"
      :page-interval="1000"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @startScroll="startScroll"
      @stopScroll="handleStopScroll"
    >
      <el-table-column type="index" label="序号" width="55" />
      <el-table-column type="selection" width="55" />
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table-scroll>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ElTableScroll from "@/components/ElTableScroll.vue";
import type { ComponentPublicInstance } from 'vue';

interface TableData {
  date: string;
  name: string;
  address: string;
}

interface TableScrollRef extends ComponentPublicInstance {
  clearSelection: () => void;
  getSelectionRows: () => TableData[];
  doLayout: () => void;
  setScrollTop: (top: number) => void;
  toggleRowSelection: (row: TableData) => void;
}

const isAutoScroll = ref<boolean>(false);
const isPageMode = ref<boolean>(false);
const tableScrollRef = ref<TableScrollRef | null>(null);

// 生成示例数据
const generateTableData = (): TableData[] => {
  const names: string[] = [
    "张三", "李四", "王五", "赵六", "钱七", "孙八", "周九", "吴十"
  ];
  const cities: string[] = [
    "北京市朝阳区", "上海市浦东新区", "广州市天河区",
    "深圳市南山区", "杭州市西湖区"
  ];
  const streets: string[] = [
    "明珠路", "阳光街", "幸福大道", "和平路", "繁华街"
  ];

  return Array.from({ length: 20 }, () => {
    const date = new Date(2016, 4, Math.floor(Math.random() * 30) + 1);
    const dateStr = `2016-05-${date.getDate().toString().padStart(2, "0")}`;
    
    return {
      date: dateStr,
      name: names[Math.floor(Math.random() * names.length)],
      address: `${cities[Math.floor(Math.random() * cities.length)]}${
        streets[Math.floor(Math.random() * streets.length)]
      }`,
    };
  });
};

const tableData = ref<TableData[]>(generateTableData());

// 方法定义
const handleClearSelection = (): void => {
  console.log('清除选中', tableScrollRef.value);
  tableScrollRef.value?.clearSelection();
};

const getSelectedRows = (): TableData[] | undefined => {
  return tableScrollRef.value?.getSelectionRows();
};

const doLayout = (): void => {
  tableScrollRef.value?.doLayout();
};

const scrollToTop = (): void => {
  tableScrollRef.value?.setScrollTop(0);
};

const toggleRowSelection = (row: TableData): void => {
  tableScrollRef.value?.toggleRowSelection(row);
};

const startScroll = (): void => {
  console.log("开始滚动");
};

const handleStopScroll = (): void => {
  console.log("停止滚动");
};

const handleSelectionChange = (val: TableData[]): void => {
  console.log("选中的行:", val);
};

onMounted(() => {
  console.log('表格组件方法:', tableScrollRef.value);
  tableScrollRef.value?.clearSelection();
});
</script>

<style scoped>
.table-page {
  padding: 20px;
  height: calc(100vh - 40px);
}

.controls {
  margin-bottom: 20px;
}

.el-table-scroll {
  height: calc(100% - 100px);
}
</style>
