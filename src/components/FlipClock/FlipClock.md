# FlipClock 翻牌时钟组件

一个具有科技感的翻牌时钟组件，支持自定义格式、主题色和闪烁效果。适用于各种需要展示时间的场景，如倒计时、实时时间显示等。

## 功能特点

- 支持多种时间格式显示
- 自定义主题颜色
- 可控的分隔符闪烁效果
- 平滑的翻牌动画
- 科技感的 UI 设计
- 支持日期和时间分开显示

## 基础用法

```vue
<template>
  <!-- 基础用法 - 时分秒 -->
  <FlipClock />

  <!-- 完整日期时间 -->
  <FlipClock 
    format="YYYY-MM-DD HH:mm:ss"
    theme-color="#0066ff"
    :is-blinking="true"
  />
</template>

<script setup lang="ts">
import FlipClock from '@/components/FlipClock/FlipClock.vue'
</script>
```

## Props 参数说明

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| format | string | 'HH:mm:ss' | 时间格式 |
| themeColor | string | '#00ff88' | 主题颜色 |
| isBlinking | boolean | true | 是否启用分隔符闪烁 |

## 支持的格式

- YYYY: 年份（4位数）
- MM: 月份（2位数）
- DD: 日期（2位数）
- HH: 小时（24小时制，2位数）
- mm: 分钟（2位数）
- ss: 秒数（2位数）

## 使用示例

### 时间显示
```vue
<!-- 默认时间显示（带闪烁） -->
<FlipClock format="HH:mm:ss" />

<!-- 时间显示（无闪烁） -->
<FlipClock 
  format="HH:mm:ss"
  :is-blinking="false"
/>
```

### 完整日期时间
```vue
<!-- 完整日期时间（蓝色主题） -->
<FlipClock 
  format="YYYY-MM-DD HH:mm:ss"
  theme-color="#0066ff"
  :is-blinking="true"
/>
```

### 月日时间
```vue
<!-- 月日时间（紫色主题） -->
<FlipClock 
  format="MM-DD HH:mm:ss"
  theme-color="#cc00ff"
  :is-blinking="true"
/>
```

### 其他格式
```vue
<!-- 年月日 -->
<FlipClock 
  format="YYYY-MM-DD"
  theme-color="#00ffcc"
/>

<!-- 时分 -->
<FlipClock 
  format="HH:mm"
  theme-color="#ff6600"
/>

<!-- 分秒 -->
<FlipClock 
  format="mm:ss"
  theme-color="#33cc33"
/>
```

## 主题色示例

```vue
<!-- 默认绿色 -->
<FlipClock theme-color="#00ff88" />

<!-- 蓝色 -->
<FlipClock theme-color="#0066ff" />

<!-- 紫色 -->
<FlipClock theme-color="#cc00ff" />

<!-- 橙色 -->
<FlipClock theme-color="#ff6600" />

<!-- 青色 -->
<FlipClock theme-color="#00ffcc" />
```

## 注意事项

1. 主题色支持十六进制颜色值
2. 组件会根据主���色自动生成：
   - 数字颜色
   - 边框颜色
   - 发光效果
   - 分隔符颜色
3. 建议在深色背景下使用，可以获得更好的视觉效果
4. 日期和时间之间会自动添加合适的间距
5. 所有数字都会以两位数显示（年份四位）

## 最佳实践

```vue
<!-- 完整日期时间显示 -->
<FlipClock 
  format="YYYY-MM-DD HH:mm:ss"
  theme-color="#0066ff"
  :is-blinking="true"
/>

<!-- 简洁时间显示 -->
<FlipClock 
  format="HH:mm:ss"
  theme-color="#00ff88"
  :is-blinking="true"
/>

<!-- 日期显示 -->
<FlipClock 
  format="YYYY-MM-DD"
  theme-color="#00ffcc"
  :is-blinking="false"
/>

<!-- 时分显示 -->
<FlipClock 
  format="HH:mm"
  theme-color="#ff6600"
  :is-blinking="true"
/>
``` 