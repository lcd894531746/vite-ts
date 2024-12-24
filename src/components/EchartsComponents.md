# EchartsComponents 使用文档

## 组件简介

EchartsComponents 是一个基于 ECharts 的 Vue3 图表组件封装，提供了简单易用的接口来创建和管理 ECharts 图表。该组件支持自动响应式调整、配置更新、实例管理等功能。

## 基本用法

```vue
<template>
  <EchartsComponents
    id="unique-chart-id"
    :echarts-type="'line-simple'"
    :chart-data="chartData"
    :options="options"
    @option-change="handleOptionChange"
    @on-init="handleInit"
  />
</template>
<script setup lang="ts">
import EchartsComponents from "@/components/EchartsComponents.vue";
import type { EChartsOption, ECharts } from "echarts";
const chartData = {
  // 图表数据配置
};
const options = {
  // 额外的图表配置选项
};
const handleOptionChange = ({
  type,
  option,
}: {
  type: string;
  option: EChartsOption;
}) => {
  // 处理配置变化
};
const handleInit = ({
  instance,
  option,
}: {
  instance: ECharts;
  option: EChartsOption;
}) => {
  // 处理图表初始化完成事件
};
</script>
```

## Props

| 属性名      | 类型   | 默认值   | 必填 | 说明                             |
| ----------- | ------ | -------- | ---- | -------------------------------- |
| id          | string | 随机生成 | 否   | 图表容器的唯一标识符             |
| echartsType | string | -        | 是   | 图表类型，对应 ECharts 官方示例的 c 参数值，例如 'line-simple', 'bar-simple' 等 |
| chartData   | object | {}       | 否   | 图表数据配置                     |
| options     | object | {}       | 否   | 额外的图表配置选项               |

## echartsType 类型说明

echartsType 参数值来自 ECharts 官方示例，可以直接使用示例URL中的 c 参数值。例如：

- 基础折线图：`line-simple`
- 基础柱状图：`bar-simple`
- 基础饼图：`pie-simple`
- 基础散点图：`scatter-simple`

示例链接格式：`https://echarts.apache.org/examples/zh/editor.html?c=${echartsType}`

### 常用 type 值示例

```vue
<!-- 基础折线图 -->
<EchartsComponents echarts-type="line-simple" />

<!-- 基础柱状图 -->
<EchartsComponents echarts-type="bar-simple" />

<!-- 基础饼图 -->
<EchartsComponents echarts-type="pie-simple" />
```

### 完整示例

```vue
<template>
  <EchartsComponents
    id="line-chart"
    echarts-type="line-simple"
    :chart-data="{
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      series: [{
        data: [150, 230, 224, 218, 135, 147, 260]
      }]
    }"
  />
</template>
```

## 获取更多图表类型

1. 访问 [ECharts 官方示例](https://echarts.apache.org/examples/zh/index.html)
2. 选择需要的图表示例
3. 从示例URL中获取 c 参数值作为 echarts-type

> 提示：可以通过访问 `https://echarts.apache.org/examples/zh/editor.html?c=${echartsType}` 预览对应的图表效果

## Events

| 事件名        | 参数                                         | 说明                   |
| ------------- | -------------------------------------------- | ---------------------- |
| option-change | { type: string, option: EChartsOption }      | 图表配置发生变化时触发 |
| on-init       | { instance: ECharts, option: EChartsOption } | 图表初始化完成时触发   |

## 暴露的方法和属性

组件通过 `defineExpose` 暴露了以下内容：

- `chartInstance()`: 获取当前 ECharts 实例
- `finalOptions`: 获取最终的图表配置项

## 自动特性

1. **响应式调整**：

   - 自动监听窗口大小变化
   - 使用防抖处理来优化性能

2. **配置合并**：

   - 自动合并默认配置、chartData 和 options
   - 支持深度监听配置变化

3. **生命周期管理**：
   - 自动处理组件挂载和卸载
   - 适当清理资源和事件监听

## 示例

### 基础折线图

```vue
<template>
  <EchartsComponents
    id="basic-line"
    echarts-type="line"
    :chart-data="{
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
        },
      ],
    }"
  />
</template>
```

### 带配置项的图表

```vue
<template>
  <EchartsComponents
    id="custom-chart"
    echarts-type="bar"
    :chart-data="chartData"
    :options="{
      title: {
        text: '自定义图表',
      },
      tooltip: {
        trigger: 'axis',
      },
    }"
    @on-init="handleChartInit"
  />
</template>
```


## 注意事项

1. 确保容器元素具有明确的宽高，否则图表可能无法正确渲染
2. 在组件卸载时会自动清理实例和事件监听
3. 深度监听配置变化可能会影响性能，请合理使用
4. 建议为每个图表指定唯一的 id

## 最佳实践

1. 使用 TypeScript 类型支持获得更好的开发体验
2. 合理使用 options 和 chartData 分离配置
3. 监听 on-init 事件以获取图表实例进行进一步操作
4. 使用 ref 或 expose 的方法获取图表实例时进行空值检查
