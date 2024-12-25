# RollingDisplay 滚动展示组件

一个支持垂直和水平方向滚动的展示组件，具有现代感的 UI 设计，支持自定义主题色，可用于消息通知、新闻滚动等场景。

## 功能特点

- 支持垂直和水平两个方向的滚动
- 支持自定义主题色
- 支持图文混合展示
- 支持鼠标悬停暂停
- 支持自定义滚动速度
- 支持点击事件
- 支持图片预览
- 支持响应式布局

## 基础用法

```vue
<template>
  <!-- 基础用法 - 默认蓝色主题 -->
  <RollingDisplay
    :data="notices"
    direction="horizontal"
    :speed="50"
    :hover-pause="true"
    width="300px"
    height="60px"
  />

  <!-- 自定义主题色 -->
  <RollingDisplay
    :data="notices"
    direction="vertical"
    :speed="40"
    theme="#00ff88"
    width="300px"
    height="120px"
  />
</template>

<script setup lang="ts">
const notices = [
  { text: "消息1", image: "/warning.png" },
  { text: "消息2", image: "/info.png" },
  { text: "消息3", image: "/success.png" },
];
</script>
```

## Props 参数说明

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| data | (string \| RollingItem)[] | [] | 要显示的数据列表 |
| direction | 'vertical' \| 'horizontal' | 'vertical' | 滚动方向 |
| speed | number | 50 | 滚动速度，数值越大速度越快 |
| hoverPause | boolean | true | 是否在鼠标悬停时暂停滚动 |
| clickable | boolean | true | 是否可点击 |
| visibleItems | number | 3 | 可见项目数量 |
| width | string \| number | '300px' | 组件宽度 |
| height | string \| number | - | 组件高度 |
| theme | string | '#0066FF' | 主题色，支持十六进制颜色值 |
| singleScroll | boolean | false | 是否允许单个项目滚动 |
| wheelable | boolean | true | 是否支持鼠标滚轮控制 |

## 主题色示例

```vue
<!-- 默认蓝色主题 -->
<RollingDisplay :data="notices" theme="#0066FF" />

<!-- 绿色科技主题 -->
<RollingDisplay :data="notices" theme="#00ff88" />

<!-- 紫色未来主题 -->
<RollingDisplay :data="notices" theme="#cc00ff" />

<!-- 红色警告主题 -->
<RollingDisplay :data="notices" theme="#ff0066" />

<!-- 橙色活力主题 -->
<RollingDisplay :data="notices" theme="#ff9900" />

<!-- 青色海洋主题 -->
<RollingDisplay :data="notices" theme="#00e5ff" />
```

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| change | { currentIndex: number, currentItem: RollingItem } | 当前项改变时触发 |
| pause | - | 滚动暂停时触发 |
| resume | - | 滚动恢复时触发 |
| itemClick | { item: RollingItem, index: number } | 点击项目时触发 |

## 插槽

组件提供了自定义项目内容的插槽：

```vue
<RollingDisplay :data="notices">
  <template #item="{ item, index }">
    <div class="custom-item">
      <img v-if="item.image" :src="item.image" />
      <span>{{ item.text }}</span>
    </div>
  </template>
</RollingDisplay>
```

## 数据格式

```typescript
interface RollingItem {
  text?: string;      // 文本内容
  image?: string;     // 图片地址
  html?: string;      // HTML 内容
}
```

## 注意事项

1. 主题色支持十六进制格式（如 #00ff88）
2. 组件会根据主题色自动生成：
   - 背景色（带透明度）
   - 边框颜色
   - 文字颜色
   - 悬停效果
   - 阴影效果
3. 建议在深色背景下使用，可获得更好的视觉效果
4. 图片预览功能需要配合 clickable 属性使用
5. 响应式布局下，width 属性会自动适应容器宽度

## 最佳实践

```vue
<!-- 消息通知 -->
<RollingDisplay
  :data="notifications"
  direction="vertical"
  :speed="40"
  theme="#00ff88"
  width="300px"
  height="120px"
  :hover-pause="true"
/>

<!-- 新闻滚动 -->
<RollingDisplay
  :data="news"
  direction="horizontal"
  :speed="50"
  theme="#0066FF"
  width="500px"
  height="40px"
/>

<!-- 警告信息 -->
<RollingDisplay
  :data="warnings"
  direction="vertical"
  :speed="60"
  theme="#ff0066"
  width="300px"
  height="80px"
/>
```
</RollingDisplay>