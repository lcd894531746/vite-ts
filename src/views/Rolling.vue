<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <h1>RollingDisplay</h1>
    <RollingDisplay
      :data="notices"
      direction="horizontal"
      :speed="50"
      :hover-pause="true"
      width="300px"
      height="60px"
    />
  </div>
</template>

<script setup lang="ts">
import RollingDisplay from "@/components/rollingDisplay/index.vue";

interface RollingItem {
  text?: string;
  image?: string;
}

const notices: RollingItem[] = [
  { text: "消息1", image: "/warning.png" },
  { text: "消息2", image: "/info.png" },
  { text: "消息3", image: "/success.png" },
];
</script>
