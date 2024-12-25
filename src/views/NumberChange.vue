<!-- 数字翻牌器 -->
<template>
  <div class="number-change-demo">
    <h3>基础数字展示</h3>
    <NumberChange :value="123456" />

    <h3>带小数点的数字</h3>
    <NumberChange
      :value="12345.67"
      color="#00ffff"
    />

    <h3>大数值带分隔符</h3>
    <NumberChange
      :value="9876543210"
      separator=","
      color="#ff0066"
    />

    <h3>金额展示（带单位和分隔符）</h3>
    <NumberChange
      :value="1234567.89"
      separator=","
      unit="￥"
      color="#00ff88"
    />

    <h3>百分比展示</h3>
    <NumberChange
      :value="99.99"
      unit="%"
      color="#cc00ff"
    />

    <h3>紧凑数字展示</h3>
    <NumberChange
      :value="123456"
      :separator="''"
      :showSeparatorSpace="false"
      color="#ff9900"
    />

    <h3>自定义动画时长</h3>
    <NumberChange
      :value="987654"
      :duration="5000"
      separator=","
      color="#0096ff"
    />
  </div>
</template>

<script setup lang="ts">
import NumberChange from "@/components/NumberChange/index.vue";
</script>

<style scoped>
.number-change-demo {
  padding: 20px;
  background: #1a1a1a;
  min-height: 100vh;
}

.number-change-demo h3 {
  color: #fff;
  margin: 30px 0 10px;
  font-size: 16px;
  opacity: 0.8;
}
</style>
