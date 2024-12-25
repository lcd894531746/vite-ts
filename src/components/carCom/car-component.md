# CarCom 科技感卡片组件

一个具有现代科技感的卡片组件，支持自定义主题色、图标、标题等，适用于数据展示、监控面板等场景。具有炫酷的扫描线动画和交互效果。

## 功能特点

- 支持多种主题色
- 自定义头部样式
- 支持图标定制
- 炫酷的扫描线动画
- 磨砂玻璃效果
- 优雅的悬浮交互
- 支持插槽自定义

## 基础用法

```vue
<template>
  <!-- 基础用法 -->
  <CarCom title="数据监控">
    <template #content>
      监控内容
    </template>
  </CarCom>

  <!-- 自定义主题 -->
  <CarCom 
    title="系统状态" 
    type="success"
    :show-icon="true"
    icon="icon-monitor"
  >
    <template #content>
      状态内容
    </template>
  </CarCom>
</template>

<script setup lang="ts">
import CarCom from '@/components/carCom/index.vue'
</script>
```

## Props 参数说明

| 参数名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| headerTitle | string | '头部' | 顶部标题文本 |
| title | string | '数据监控' | 卡片标题 |
| type | 'primary' \| 'success' \| 'warning' \| 'danger' | 'primary' | 主题类型 |
| headerStyle | object | {} | 顶部标题自定义样式 |
| contentheaderStyle | object | {} | 内容区头部自定义样式 |
| separateHeader | boolean | false | 是否分离头部 |
| showIcon | boolean | true | 是否显示图标 |
| icon | string | '' | 自定义图标类名 |

## 主题类型示例

```vue
<!-- 默认主题 - 蓝色 -->
<CarCom title="默认主题" type="primary" />

<!-- 成功主题 - 绿色 -->
<CarCom title="成功主题" type="success" />

<!-- 警告主题 - 橙色 -->
<CarCom title="警告主题" type="warning" />

<!-- 危险主题 - 红色 -->
<CarCom title="危险主题" type="danger" />
```

## 插槽

组件提供了多个插槽用于自定义内容：

| 插槽名 | 说明 |
|--------|------|
| header | 自定义顶部标题区域 |
| contentheader | 自定义内容区头部 |
| content | 自定义主体内容 |
| extra | 自定义头部右侧额外内容 |

```vue
<CarCom>
  <!-- 自定义顶部标题 -->
  <template #header>
    <div class="custom-header">自定义标题</div>
  </template>

  <!-- 自定义内容区头部 -->
  <template #contentheader>
    <div class="custom-content-header">
      <h3>自定义内容头部</h3>
      <div class="tools">工具栏</div>
    </div>
  </template>

  <!-- 自定义主体内容 -->
  <template #content>
    <div class="custom-content">
      自定义内容区域
    </div>
  </template>

  <!-- 头部右侧额外内容 -->
  <template #extra>
    <div class="extra-content">
      额外信息
    </div>
  </template>
</CarCom>
```

## 样式定制

组件内置了多个主题变量，可以通过 CSS 变量覆盖默认样式：

```css
.tech-card {
  /* 主题色 */
  --theme-color: #2093ff;
  
  /* 背景渐变 */
  background: linear-gradient(
    145deg,
    rgba(16, 20, 24, 0.9),
    rgba(23, 32, 38, 0.8)
  );
}
```

## 注意事项

1. 组件默认具有磨砂玻璃效果，建议在深色背景下使用
2. 图标需要单独引入图标库或使用自定义图标
3. 主题色会影响：
   - 标题颜色
   - 图标颜色
   - 扫描线颜色
   - 边框颜色
4. 建议设置合适的内容高度以获得最佳显示效果

## 最佳实践

```vue
<!-- 数据监控卡片 -->
<CarCom
  headerTitle="系统监控"
  title="CPU使用率"
  type="primary"
  :show-icon="true"
  icon="icon-cpu"
>
  <template #content>
    <div class="monitor-content">
      <!-- 监控数据 -->
    </div>
  </template>
  <template #extra>
    <div class="monitor-tools">
      <!-- 工具按钮 -->
    </div>
  </template>
</CarCom>

<!-- 状态展示卡片 -->
<CarCom
  headerTitle="系统状态"
  title="运行状态"
  type="success"
  :show-icon="true"
  icon="icon-status"
>
  <template #content>
    <div class="status-content">
      <!-- 状态信息 -->
    </div>
  </template>
</CarCom>

<!-- 警告信息卡片 -->
<CarCom
  headerTitle="告警信息"
  title="系统告警"
  type="warning"
  :show-icon="true"
  icon="icon-warning"
>
  <template #content>
    <div class="warning-content">
      <!-- 告警列表 -->
    </div>
  </template>
</CarCom>
```
