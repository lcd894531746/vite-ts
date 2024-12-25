<!-- 数字翻牌器 -->
<template>
  <div style="color: #fff">数字翻牌器</div>
  <NumberChange
    :value="454545.97"
    :duration="2000"
    :unit="'$'"
    :separator="''"
    color="#00ff88"
    :showSeparatorSpace="true"
  ></NumberChange>
</template>

<script setup lang="ts">
import NumberChange from "@/components/NumberChange/index.vue";
</script>

<style></style>
