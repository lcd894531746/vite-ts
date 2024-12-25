# NumberChange 数字翻牌器组件

一个具有动画效果的数字翻牌器组件，支持自定义颜色、分隔符、单位等，具有科技感的 UI 设计。

## 功能特点

- 数字滚动动画效果
- 支持自定义主题颜色
- 支持添加分隔符
- 支持添加单位
- 可配置动画时长
- 支持控制分隔间距

## 基础用法

<template>
<!-- 基础用法 -->
<NumberChange :value="123456" />
<!-- 带分隔符 -->
<NumberChange :value="123456" separator="," />
<!-- 带单位 -->
<NumberChange :value="123456" unit="元" />
<!-- 自定义颜色 -->
<NumberChange :value="123456" color="#ff0066" />
</template>

## Props 参数说明

| 参数名             | 类型             | 默认值    | 说明                                 |
| ------------------ | ---------------- | --------- | ------------------------------------ |
| value              | number \| string | 0         | 要显示的数值                         |
| duration           | number           | 2000      | 动画持续时间（毫秒）                 |
| separator          | string           | ','       | 分隔符，为空字符串时不显示分隔符     |
| unit               | string           | ''        | 单位，为空字符串时不显示单位         |
| color              | string           | '#00ff88' | 主题颜色，支持十六进制和 RGB 格式    |
| showSeparatorSpace | boolean          | true      | 是否显示分隔符间距（即使分隔符为空） |

## 使用示例

### 基础数字显示

<NumberChange :value="123456" />

### 带分隔符和单位

```vue
<NumberChange :value="123456789" separator="," unit="元" />
```

### 自定义颜色和动画时长

```vue
<NumberChange :value="123456" color="#ff0066" :duration="1000" />
```

### 不显示分隔符但保留间距

```vue
<NumberChange :value="123456" :separator="''" :showSeparatorSpace="true" />
```

### 完全紧凑显示（无分隔符和间距）

```vue
<NumberChange :value="123456" :separator="''" :showSeparatorSpace="false" />
```

### 完整示例

```vue
<NumberChange
  :value="9876543210"
  separator=","
  unit="元"
  color="#00ffff"
  :duration="2000"
  :showSeparatorSpace="true"
/>
```

## 最佳实践

````vue
<!-- 推荐用法 -->
<NumberChange
  :value="123456789"
  separator=","
  unit="元"
  color="#00ff88"
  :duration="2000"
/>
```vue

<!-- 紧凑数字显示 -->
<NumberChange :value="123456" :separator="''" :showSeparatorSpace="false" />

<!-- 大数值显示 -->
<NumberChange :value="987654321" separator="," :showSeparatorSpace="true" />
````

```vue
<!-- 推荐用法 -->
<NumberChange
  :value="123456789"
  separator=","
  unit="元"
  color="#00ff88"
  :duration="2000"
/>
```

```vue
<!-- 紧凑数字显示 -->

<NumberChange :value="123456" :separator="''" :showSeparatorSpace="false" />
```

```vue
<!-- 大数值显示 -->

<NumberChange :value="987654321" separator="," :showSeparatorSpace="true" />
```

## 注意事项

1. 颜色支持十六进制（如 #00ff88）或 RGB 格式（如 rgb(0, 255, 136)）
2. 动画时长不建议设置太短，可能会影响动画效果
3. 建议使用等宽字体获得最佳显示效果
4. 组件默认带有背景色和模糊效果，可以配合暗色背景获得更好的视觉效果

## 样式定制

组件内部使用了一些预设的样式，如果需要进一步定制，可以通过以下方式：

1. 调整 color 属性来改变主题色
2. 组件会自动根据主题色生成：
   - 文字颜色
   - 发光效果
   - 边框颜色
   - 阴影效果
