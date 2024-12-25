# NumberChange 数字翻牌器组件

一个具有动画效果的数字翻牌器组件，支持自定义颜色、分隔符、单位等，具有科技感的 UI 设计。适用于数据展示、实时监控等场景。

## 功能特点

- 数字滚动动画效果
- 支持自定义主题颜色
- 支持添加分隔符
- 支持添加单位
- 支持小数点显示
- 可配置动画时长
- 支持控制分隔间距

## 基础用法

```vue
<template>
  <!-- 基础用法 -->
  <NumberChange :value="123456" />

  <!-- 带分隔符和单位 -->
  <NumberChange 
    :value="123456789" 
    separator="," 
    unit="元"
    color="#00ff88"
  />

  <!-- 带小数点 -->
  <NumberChange 
    :value="12345.67" 
    separator="," 
    unit="$"
    color="#ff0066"
  />
</template>

<script setup lang="ts">
import NumberChange from '@/components/NumberChange/index.vue'
</script>
```

## Props 参数说明

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | number \| string | 0 | 要显示的数值 |
| duration | number | 2000 | 动画持续时间（毫秒） |
| separator | string | ',' | 分隔符，为空字符串时不显示分隔符 |
| unit | string | '' | 单位，为空字符串时不显示单位 |
| color | string | '#00ff88' | 主题颜色，支持十六进制和 RGB 格式 |
| showSeparatorSpace | boolean | true | 是否显示分隔符间距（即使分隔符为空） |

## 使用示例

### 基础数字显示
```vue
<NumberChange :value="123456" />
```

### 带分隔符和单位
```vue
<NumberChange 
  :value="123456789" 
  separator="," 
  unit="元"
  color="#00ff88"
/>
```

### 带小数点显示
```vue
<NumberChange 
  :value="1234.56" 
  separator="," 
  unit="$"
  color="#ff0066"
/>
```

### 自定义颜色和动画时长
```vue
<NumberChange 
  :value="123456" 
  color="#cc00ff"
  :duration="1000"
/>
```

### 不显示分隔符但保留间距
```vue
<NumberChange 
  :value="123456" 
  :separator="''"
  :showSeparatorSpace="true"
/>
```

### 完全紧凑显示（无分隔符和间距）
```vue
<NumberChange 
  :value="123456" 
  :separator="''"
  :showSeparatorSpace="false"
/>
```

## 样式定制

组件内置了主题相关的样式变量，可以通过 props 进行覆盖：

```vue
<NumberChange 
  :value="9876543210"
  color="#00ffff"        // 主题色
  separator=","          // 分隔符
  unit="元"             // 单位
  :duration="2000"      // 动画时长
/>
```

主题色会影响：
- 数字颜色
- 发光效果
- 单位颜色
- 分隔符颜色

## 注意事项

1. 组件会自动处理数字的千位分隔
2. 支持小数点显示，小数部分也会有动画效果
3. 建议在深色背景下使用，可以获得更好的视觉效果
4. 动画时长不建议设置过短，可能影响视觉效果
5. 组件会自动处理数值的格式化显示

## 最佳实践

```vue
<!-- 金额展示 -->
<NumberChange 
  :value="1234567.89"
  separator=","
  unit="￥"
  color="#00ff88"
  :duration="2000"
/>

<!-- 百分比展示 -->
<NumberChange 
  :value="99.99"
  unit="%"
  color="#ff0066"
  :duration="1500"
/>

<!-- 数量统计 -->
<NumberChange 
  :value="987654"
  separator=","
  color="#00e5ff"
  :showSeparatorSpace="true"
/>

<!-- 简洁数字 -->
<NumberChange 
  :value="12345"
  :separator="''"
  :showSeparatorSpace="false"
  color="#cc00ff"
/>
```
