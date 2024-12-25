<template>
  <div class="number-flip">
    <div class="number-box">
      <template v-for="(item, index) in numberList" :key="index">
        <!-- 数字项 -->
        <div class="number-item" v-if="item.type === 'number'">
          <div class="digital-wrap">
            <div class="digital" :style="{ transform: `translateY(${item.translateY}%)` }">
              <span v-for="num in 10" :key="num" class="num">{{ num - 1 }}</span>
            </div>
          </div>
        </div>
        <!-- 分隔符 -->
        <div 
          v-else-if="item.type === 'separator' && (separator || showSeparatorSpace)" 
          class="separator"
        >
          {{ separator }}
        </div>
        <!-- 小数点 -->
        <div v-else-if="item.type === 'decimal-point'" class="decimal-point">
          {{ item.value }}
        </div>
      </template>
      <!-- 单位 -->
      <div v-if="unit" class="unit">{{ unit }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

interface Props {
  value: number | string
  duration?: number
  separator?: string
  unit?: string
  color?: string
  showSeparatorSpace?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: 9876543210,
  duration: 2000,
  separator: ',',
  unit: '元',
  color: '#00ff88',
  showSeparatorSpace: true
})

// 将数字转换为数组，包含数字和分隔符
const numberList = ref<Array<{ value: string; translateY: number; type: 'number' | 'separator' }>>([])

// 处理数字和分隔符
const formatNumber = (num: number | string) => {
  const numStr = num.toString()
  const result = []
  
  // 分离整数部分和小数部分
  const [integerPart, decimalPart] = numStr.split('.')
  const reversedInt = integerPart.split('').reverse()
  
  // 处理整数部分
  for (let i = 0; i < reversedInt.length; i++) {
    // 添加数字
    result.unshift({ 
      value: reversedInt[i], 
      translateY: 0, 
      type: 'number',
      prevValue: undefined
    })
    // 在有 separator 或 showSeparatorSpace 为 true 时添加分隔符位置
    if ((props.separator || props.showSeparatorSpace) && i !== reversedInt.length - 1 && (i + 1) % 3 === 0) {
      result.unshift({ 
        value: props.separator, 
        translateY: 0, 
        type: 'separator' 
      })
    }
  }

  // 如果有小数部分，添加小数点和小数
  if (decimalPart) {
    // 添加小数点
    result.push({
      value: '.',
      translateY: 0,
      type: 'decimal-point'
    })
    
    // 添加小数部分
    decimalPart.split('').forEach(digit => {
      result.push({
        value: digit,
        translateY: 0,
        type: 'number'
      })
    })
  }
  
  return result
}

// 监听数值变化
watch(() => props.value, (newVal) => {
  const formattedList = formatNumber(newVal)
  numberList.value = formattedList.map(item => ({
    ...item,
    translateY: 0
  }))
  
  // 触发动画
  requestAnimationFrame(() => {
    numberList.value = numberList.value.map(item => {
      if (item.type === 'number') {
        return {
          ...item,
          translateY: -Number(item.value) * 10
        }
      }
      return item
    })
  })
}, { immediate: true })

// 根据主色调生成主题颜色
const themeStyle = computed(() => {
  const color = props.color
  return {
    color: color,
    shadowColor: color.replace(')', ', 0.8)').replace('rgb', 'rgba'),
    borderColor: color.replace(')', ', 0.2)').replace('rgb', 'rgba'),
    bgGradient: color.replace(')', ', 0.1)').replace('rgb', 'rgba')
  }
})
</script>

<style scoped>
.number-flip {
  display: inline-block;
  padding: 12px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px v-bind('themeStyle.shadowColor');
  border: 1px solid v-bind('themeStyle.borderColor');
}

.number-box {
  display: flex;
  align-items: center;
}

.number-item {
  width: 40px;
  height: 50px;
  background: #000;
  border: 1px solid v-bind('themeStyle.borderColor');
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  margin: 0 2px;
  box-shadow: 
    inset 0 2px 10px v-bind('themeStyle.bgGradient'),
    0 0 20px v-bind('themeStyle.shadowColor');
}

.digital-wrap {
  position: relative;
  width: 100%;
  height: 50px;
  overflow: hidden;
  z-index: 2;
}

.digital {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: transform v-bind(duration + 'ms') cubic-bezier(0.4, 0, 0.2, 1);
}

.num {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  font-family: 'Digital-7', monospace;
  color: v-bind('themeStyle.color');
  text-shadow: 0 0 12px v-bind('themeStyle.shadowColor');
}

/* 修改渐变遮罩，只使用 after */
.number-item::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 15px;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
}

/* 添加背景变效果 */
.number-item {
  background: linear-gradient(
    135deg,
    #000 0%,
    #111 45%,
    #111 55%,
    #000 100%
  );
}

.separator {
  color: v-bind('themeStyle.color');
  margin: 0 4px;
  font-size: 32px;
  opacity: 0.8;
  text-shadow: 0 0 12px v-bind('themeStyle.shadowColor');
  position: relative;
  z-index: 2;
}

.unit {
  margin-left: 8px;
  color: v-bind('themeStyle.color');
  font-size: 24px;
  opacity: 0.9;
  text-shadow: 0 0 12px v-bind('themeStyle.shadowColor');
  font-family: 'Digital-7', monospace;
  position: relative;
  z-index: 2;
}

.decimal-point {
  color: v-bind('themeStyle.color');
  margin: 0 1px;
  font-size: 32px;
  font-weight: bold;
  font-family: 'Digital-7', monospace;
  text-shadow: 0 0 12px v-bind('themeStyle.shadowColor');
  position: relative;
  z-index: 2;
}
</style>
