<template>
  <div class="M-Flipper" :class="[flipType, { 'go': isFlipping }]" :style="{ '--theme-color': themeColor }">
    <div class="digital front" :class="_textClass(frontTextFromData)" />
    <div class="digital back" :class="_textClass(backTextFromData)" />
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, defineExpose } from 'vue'

interface Props {
  // 前牌文字
  frontText?: number | string
  // 后牌文字
  backText?: number | string
  // 翻牌动画时间，与CSS中设置的animation-duration保持一致
  duration?: number
  // 添加主题颜色属性
  themeColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  frontText: 0,
  backText: 1,
  duration: 600,
  themeColor: '#000000' // 默认黑色
})

const isFlipping = ref(false)
const flipType = ref('down')
const frontTextFromData = ref<number | string>(props.frontText)
const backTextFromData = ref<number | string>(props.backText)

// 生成数字类名
const _textClass = (number: number | string): string => {
  return 'number' + number
}

// 翻转处理函数
const _flip = (type: 'down' | 'up', front: number | string, back: number | string) => {
  // 如果处于翻转中，则不执行
  if (isFlipping.value) {
    return false
  }
  frontTextFromData.value = front
  backTextFromData.value = back
  // 根据传递过来的type设置翻转方向
  flipType.value = type
  // 设置翻转状态为true
  isFlipping.value = true

  setTimeout(() => {
    // 设置翻转状态为false
    isFlipping.value = false
    frontTextFromData.value = back
  }, props.duration)
}

// 下翻牌
const flipDown = (front: number | string, back: number | string) => {
  _flip('down', front, back)
}

// 上翻牌
const flipUp = (front: number | string, back: number | string) => {
  _flip('up', front, back)
}

// 设置前牌文字
const setFront = (text: number | string) => {
  frontTextFromData.value = text
}

// 设置后牌文字
const setBack = (text: number | string) => {
  backTextFromData.value = text
}

// 暴露方法供父组件调用
defineExpose({
  flipDown,
  flipUp,
  setFront,
  setBack
})
</script>

<style scoped lang="scss">
.M-Flipper {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 100px;
  line-height: 100px;
  border: solid 1px var(--theme-color);
  border-radius: 10px;
  background: #1a1a1a;
  font-size: 66px;
  color: var(--theme-color);
  text-align: center;
  font-family: 'Helvetica Neue';
  
  // 外框发光效果
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: transparent;
    border: 2px solid var(--theme-color);
    border-radius: 12px;
    opacity: 0.5;
    z-index: -1;
    box-shadow: 
      0 0 20px var(--theme-color),
      inset 0 0 20px var(--theme-color);
    animation: borderGlow 1.5s ease-in-out infinite alternate;
  }

  .digital:before,
  .digital:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    background: #1a1a1a;
    overflow: hidden;
    box-sizing: border-box;
  }

  [class^="number"]:before,
  [class^="number"]:after {
    color: var(--theme-color);
    text-shadow: 0 0 3px var(--theme-color);
    opacity: 0.9;
  }
}

// 边框发光动画
@keyframes borderGlow {
  from {
    opacity: 0.2;
    box-shadow: 
      0 0 10px var(--theme-color),
      inset 0 0 10px var(--theme-color);
  }
  to {
    opacity: 0.5;
    box-shadow: 
      0 0 20px var(--theme-color),
      inset 0 0 20px var(--theme-color);
  }
}

.M-Flipper .digital:before {
  top: 0;
  bottom: 50%;
  border-radius: 10px 10px 0 0;
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
}

.M-Flipper .digital:after {
  top: 50%;
  bottom: 0;
  border-radius: 0 0 10px 10px;
  line-height: 0;
}

/*向下翻*/
.M-Flipper.down .front:before {
  z-index: 3;
}

.M-Flipper.down .back:after {
  z-index: 2;
  transform-origin: 50% 0%;
  transform: perspective(160px) rotateX(180deg);
}

.M-Flipper.down .front:after,
.M-Flipper.down .back:before {
  z-index: 1;
}

.M-Flipper.down.go .front:before {
  transform-origin: 50% 100%;
  animation: frontFlipDown 0.6s ease-in-out both;
  backface-visibility: hidden;
}

.M-Flipper.down.go .back:after {
  animation: backFlipDown 0.6s ease-in-out both;
}

/*向上翻*/
.M-Flipper.up .front:after {
  z-index: 3;
}

.M-Flipper.up .back:before {
  z-index: 2;
  transform-origin: 50% 100%;
  transform: perspective(160px) rotateX(-180deg);
}

.M-Flipper.up .front:before,
.M-Flipper.up .back:after {
  z-index: 1;
}

.M-Flipper.up.go .front:after {
  transform-origin: 50% 0;
  animation: frontFlipUp 0.6s ease-in-out both;
  backface-visibility: hidden;
}

.M-Flipper.up.go .back:before {
  animation: backFlipUp 0.6s ease-in-out both;
}

@keyframes frontFlipDown {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }
  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}

@keyframes backFlipDown {
  0% {
    transform: perspective(160px) rotateX(180deg);
  }
  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

@keyframes frontFlipUp {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }
  100% {
    transform: perspective(160px) rotateX(180deg);
  }
}

@keyframes backFlipUp {
  0% {
    transform: perspective(160px) rotateX(-180deg);
  }
  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

/* 数字样式 */
@for $i from 0 through 9 {
  .M-Flipper .number#{$i}:before,
  .M-Flipper .number#{$i}:after {
    content: '#{$i}';
    color: var(--theme-color);
    text-shadow: 0 0 3px var(--theme-color);
    // 添加点状效果
    -webkit-text-stroke: 1px var(--theme-color);
    font-weight: bold;
  }
}
</style>