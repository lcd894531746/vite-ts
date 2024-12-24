# ElTableScroll 使用文档

## 组件简介

ElTableScroll 是一个基于 Element Plus 的 Table 组件封装，提供了自动滚动、分页滚动等增强功能，并且包含了科技感十足的主题样式。该组件完全继承了 Element Plus Table 的所有功能，并提供了额外的滚动控制能力。

## 基本用法

```vue
<template>
  <ElTableScroll
    :data="tableData"
    :height="400"
    :auto-scroll="true"
    :scroll-speed="100"
    :page-mode="false"
    @startScroll="handleStartScroll"
    @stopScroll="handleStopScroll"
  >
    <el-table-column prop="date" label="日期" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="address" label="地址" />
  </ElTableScroll>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ElTableScroll from '@/components/ElTableScroll.vue'

const tableData = ref([
  // 表格数据...
])

const handleStartScroll = () => {
  console.log('开始滚动')
}

const handleStopScroll = () => {
  console.log('停止滚动')
}
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| height | string/number | 400 | 表格高度 |
| autoScroll | boolean | false | 是否开启自动滚动 |
| scrollSpeed | number | 100 | 滚动速度(ms) |
| step | number | 1 | 每次滚动的步长(px) |
| pageMode | boolean | false | 是否启用分页滚动模式 |
| pageInterval | number | 3000 | 分页模式下的翻页间隔(ms) |

> 注：组件支持所有 Element Plus Table 的原生属性

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| startScroll | - | 开始滚动时触发 |
| stopScroll | - | 停止滚动时触发 |

> 注：组件支持所有 Element Plus Table 的原生事件

## 暴露的方法

组件通过 `defineExpose` 暴露了以下方法：

### 滚动控制方法
- `startScroll()`: 开始滚动
- `stopScroll()`: 停止滚动
- `isScrolling`: 获取当前滚动状态
- `getCurrentPage()`: 获取当前页码
- `getTotalPages()`: 获取总页数

### 继承自 Element Plus Table 的方法
- `clearSelection()`: 清空选择
- `toggleRowSelection()`: 切换行选中状态
- `toggleAllSelection()`: 切换全选状态
- `toggleRowExpansion()`: 切换行展开状态
- `setCurrentRow()`: 设置当前行
- `clearSort()`: 清空排序
- `clearFilter()`: 清空筛选
- `doLayout()`: 重新布局
- `sort()`: 手动排序
- `scrollTo()`: ���动到指定位置
- `setScrollTop()`: 设置垂直滚动位置
- `setScrollLeft()`: 设置水平滚动位置

## 特性

1. **自动滚动**：
   - 支持连续滚动和分页滚动两种模式
   - 鼠标悬停自动暂停，移出后继续
   - 可控制滚动速度和步长

2. **科技主题**：
   - 内置科技感设计主题
   - 自定义边框、背景、悬浮效果
   - 优化的滚动条样式

3. **响应式处理**：
   - 自动适应容器大小
   - 平滑的滚动动画
   - 优化的性能处理

## 示例

### 连续滚动模式

```vue
<template>
  <ElTableScroll
    :data="tableData"
    :height="400"
    :auto-scroll="true"
    :scroll-speed="100"
    :step="1"
  >
    <el-table-column prop="date" label="日期" />
    <el-table-column prop="name" label="姓名" />
  </ElTableScroll>
</template>
```

### 分页滚动模式

```vue
<template>
  <ElTableScroll
    :data="tableData"
    :height="400"
    :auto-scroll="true"
    :page-mode="true"
    :page-interval="3000"
  >
    <el-table-column prop="date" label="日期" />
    <el-table-column prop="name" label="姓名" />
  </ElTableScroll>
</template>
```

## 注意事项

1. 确保表格有固定的高度，否则可能影响滚动效果
2. 分页模式下，建议根据数据量调整 pageInterval
3. 自动滚动时，鼠标悬停会暂停滚动
4. 组件会自动处理滚动还原，无需手动控制

## 最佳实践

1. 根据数据量选择合适的滚动模式
2. 合理设置滚动速度和间隔时间
3. 需要手动控制滚动时，可以使用暴露的方法
4. 可以结合 Element Plus 的其他功能，如排序、筛选等

## 样式定制

组件默认使用科技感主题，主要样式变量：

```css
.el-table-scroll {
  --el-table-border-color: rgba(0, 102, 255, 0.3);
  --el-table-header-bg-color: rgba(0, 25, 50, 0.95);
  --el-table-tr-bg-color: rgba(0, 25, 50, 0.7);
  --el-table-row-hover-bg-color: rgba(24, 63, 255, 0.15);
}
```

可以通过覆盖这些变量来自定义样式。 