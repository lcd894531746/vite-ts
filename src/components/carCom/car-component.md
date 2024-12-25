# Car 卡片组件使用文档

一个具有科技感的卡片组件，支持自定义头部、内容和动画效果。主要用于数据展示和信息卡片布局。

## 功能特点

- 科技感设计风格
- 支持自定义头部背景
- 内置动画效果
- 多主题支持
- 灵活的插槽系统

## 安装

将组件放入项目的 components 目录：

```


## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| headerTitle | 顶部标题文本 | string | '头部' |
| title | 卡片内部标题 | string | '数据监控' |
| type | 卡片主题类型 | string | 'primary' |
| headerStyle | 顶部自定义样式 | object | {} |
| contentheaderStyle | 内容区头部自定义样式 | object | {} |
| showIcon | 是否显示图标 | boolean | true |
| icon | 自定义图标类名 | string | '' |
| separateHeader | 是否分离头部 | boolean | false |


### Slots

| 名称 | 说明 |
| --- | --- |
| header | 顶部标题区域自定义内容 |
| contentheader | 内容区头部自定义内容 |
| content | 主体内容区域自定义内容 |
| extra | 头部右侧额外内容 |

### 主题类型

支持以下主题类型：
- `primary` - 默认蓝色主题
- `success` - 绿色主题
- `warning` - 橙色主题
- `danger` - 红色主题
```

## 代码示例

### 基础用法

<car-com headerTitle="基础卡片" />

### 自定义主题

<car-com
headerTitle="警告信息"
type="warning"
/>

### 自定义图标

<car-com
headerTitle="系统监控"
icon="el-icon-monitor"
/>

### 使用插槽自定义内容

<car-com headerTitle="自定义内容">

<!-- 自定义头部 -->

<template #header>

<div class="custom-header">自定义头部内容</div>
</template>
<!-- 自定义内容 -->
<template #content>
<div class="custom-content">
自定义主体内容
</div>
</template>
<!-- 自定义额外内容 -->
<template #extra>
<button>更多</button>
</template>
</car-com>

### 自定义样式

<car-com
headerTitle="自定义样式"
:headerStyle="{
backgroundImage: 'url(your-bg.jpg)',
color: '#fff'
}"
:contentheaderStyle="{
backgroundColor: 'rgba(0,0,0,0.5)'
}"
/>

### 使用插槽

<template>
<car-com headerTitle="自定义内容">
<!-- 自定义头部 -->
<template #header>
<div>自定义头部内容</div>
</template>
<!-- 自定义内容 -->
<template #content>
<div>
<h3>自定义内容区域</h3>
<p>这里可以放置任何内容</p>
</div>
</template>
<!-- 右侧额外内容 -->
<template #extra>
<button>更多</button>
</template>

## 样式定制

### 主题色定制

可以通过 CSS 变量覆盖默认主题色：

```css
.tech-card {
  --theme-color: #自定义颜色;
}
```

### 头部背景图片

默认头部背景图片位置：

```
src/components/carCom/car-bg.webp
```

可通过 `headerStyle` 自定义背景图片：

```vue
<car-com
  :headerStyle="{
    backgroundImage: 'url(your-image.jpg)',
  }"
/>
```

## 注意事项

1. 组件默认提供空状态显示，当没有内容时会显示"暂无数据"提示
2. 头部背景图片需要放在组件目录下的 `car-bg.webp`
3. 自定义图标需要确保相关图标库已正确引入
4. 组件会自动适应父容器宽度
5. 默认带有悬浮动画效果

## 最佳实践

1. 内容布局

   - 保持内容简洁
   - 合理使用空间
   - 注意信息层级

2. 主题使用

   - primary: 用于普通信息展示
   - success: 用于成功或正常状态
   - warning: 用于警告信息
   - danger: 用于错误或危险信息

3. 响应式考虑
   - 组件会自适应容器宽度
   - 注意内容在不同宽度下的展示效果

## 更新日志

### v1.0.0

- 初始版本发布
- 支持自定义头部和内容
- 提供多个主题选项
- 添加动画效果
