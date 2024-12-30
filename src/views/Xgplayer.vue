<template>
  <div class="xgplay-main">
    <Xgplay :url="url" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Xgplay from "@/components/xgplay/index.vue";

const url = ref("https://gcalic.v.myalicdn.com/gc/ljgcdyhxgjt_1/index.m3u8?contentid=2820180516001");
</script>

<style scoped lang="scss">
.xgplay-main {
  width: 100%;
  height: 100%;
}
</style>

