<template>
  <div :id="chartId" class="chart-container"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted, watch, ref } from "vue";
import { getEchartsOption } from "@/Api/common";
import type { EChartsOption, ECharts } from 'echarts';

interface Props {
  id?: string;
  echartsType: string;
  chartData?: Record<string, any>;
  options?: Record<string, any>;
}

interface EmitEvents {
  (e: 'optionChange', payload: { type: string; option: EChartsOption }): void;
  (e: 'onInit', payload: { instance: ECharts; option: EChartsOption }): void;
}

const props = withDefaults(defineProps<Props>(), {
  id: null,
  chartData: () => ({}),
  options: () => ({}),
});

// 定义要触发的事件
const emit = defineEmits<EmitEvents>();

const chartId = `chart-${props.id || Math.random().toString(36).substr(2, 9)}`;
let chartInstance: ECharts | null = null;
const chartOptions = ref<EChartsOption | null>(null);
const finalOptions = ref<EChartsOption | null>(null);

// 修改获取配置的函数，获取后触发事件
const fetchEchartsOption = async (type: string): Promise<EChartsOption | null> => {
  const option = await getEchartsOption(type);
  if (option) {
    emit('optionChange', { type, option: JSON.parse(JSON.stringify(option)) });
  }
  return option;
};

// 防抖函数
const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number): ((...args: Parameters<T>) => void) => {
  let timer: number | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

// 处理窗口大小改变
const handleResize = (): void => {
  if (chartInstance) {
    try {
      chartInstance.resize();
    } catch (error) {
      console.error("Failed to resize chart:", error);
    }
  }
};

// 初始化图表
const initChart = async (): Promise<void> => {
  if (chartInstance) {
    chartInstance.dispose();
  }

  const chartContainer = document.getElementById(chartId);
  if (!chartContainer) {
    console.error("Chart container not found");
    return;
  }

  try {
    chartInstance = echarts.init(chartContainer);

    // 获取官方示例配置
    const defaultOption = await fetchEchartsOption(props.echartsType);
    if (defaultOption) {
      chartOptions.value = defaultOption;
      // 初始化完成后触发事件
      emit('onInit', {
        instance: chartInstance,
        option: JSON.parse(JSON.stringify(defaultOption))
      });
    }
    setChartOptions();
  } catch (error) {
    console.error("Failed to initialize chart:", error);
  }

  const debouncedResize = debounce(handleResize, 300);
  window.addEventListener("resize", debouncedResize);
};

// 设置图表配置
const setChartOptions = (): void => {
  if (!chartInstance) return;

  finalOptions.value = {
    ...(chartOptions.value || {}),
    ...props.chartData,
    ...props.options,
  } as EChartsOption;

  try {
    chartInstance.setOption(finalOptions.value, true);
  } catch (error) {
    console.error("Failed to set chart options:", error);
  }
};

// 监听类型变化
watch(
  () => props.echartsType,
  async () => {
    try {
      const newOption = await fetchEchartsOption(props.echartsType);
      console.log('类型变化，新配置:', newOption);
      if (newOption) {
        chartOptions.value = newOption;
        setChartOptions();
      }
    } catch (error) {
      console.error("Failed to update chart type:", error);
    }
  }
);

// 监听数据和配置变化
watch(
  [() => props.chartData, () => props.options],
  () => {
    setChartOptions();
  },
  { deep: true }
);

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  if (chartInstance) {
    try {
      chartInstance.dispose();
      chartInstance = null;
    } catch (error) {
      console.error("Failed to dispose chart:", error);
    }
  }
  window.removeEventListener("resize", handleResize);
});

// 暴露实例和配置
defineExpose({
  chartInstance: (): ECharts | null => chartInstance,
  finalOptions,
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
