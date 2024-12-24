<template>
  <div class="chart-container">
    <EchartsComponent
      ref="chartRef"
      :echartsType="currentType"
      :options="customOptions"
      @optionChange="handleOptionChange"
      @onInit="handleChartInit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EchartsComponent from "@/components/EchartsComponents.vue";
import { mergeEChartsOption } from '@/Api/common';
import type { EChartsOption, ECharts } from 'echarts';
import type { ComponentPublicInstance } from 'vue';

interface ChartRef extends ComponentPublicInstance {
  chartInstance: () => ECharts | null;
  finalOptions: EChartsOption | null;
}

interface OptionChangePayload {
  type: string;
  option: EChartsOption;
}

interface ChartInitPayload {
  instance: ECharts;
  option: EChartsOption;
}

const chartRef = ref<ChartRef | null>(null);
const currentType = ref<string>("line-simple");
const customOptions = ref<EChartsOption>({});
let originalOption: EChartsOption | null = null;

// 处理配置变化
const handleOptionChange = ({ type, option }: OptionChangePayload): void => {
  originalOption = option;
  console.log("获取到原始配置:", option);

  // 这里可以获取图表实例和配置
  // const instance = chartRef.value?.chartInstance();
  // const options = chartRef.value?.finalOptions;

  // console.log("当前图表实例:", instance);
  // console.log("当前配置:", options);

  const finalOption = mergeEChartsOption(option, {
    title: {
      text: "自定义标题",
      left: "center",
    },
  });

  customOptions.value = finalOption;
};

// 处理图表初始化
const handleChartInit = ({ instance, option }: ChartInitPayload): void => {
  // console.log("图表实例:", instance);
  // console.log("初始配置:", option);

  instance.on("click", (params) => {
    // 也可以在这里获取最新的实例和配置
    const currentInstance = chartRef.value?.chartInstance();
    const currentOptions = chartRef.value?.finalOptions;
    console.log("点击事件:", params);
    console.log("当前配置:", currentOptions);
  });
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 500px;
  background-color: #000;
  border-radius: 10px;
}
</style>
