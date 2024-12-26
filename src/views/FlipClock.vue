<template>
  <div class="flip-clock-demo">
    <section class="demo-item">
      <h3>时间显示（HH:mm:ss）- 默认闪烁</h3>
      <FlipClock format="HH:mm:ss" />
    </section>

    <section class="demo-item">
      <h3>时间显示（HH:mm:ss）- 无闪烁</h3>
      <FlipClock format="HH:mm:ss" :is-blinking="false" />
    </section>

    <section class="demo-item">
      <h3>完整日期时间 - 蓝色主题带闪烁</h3>
      <FlipClock
        format="YYYY-MM-DD HH:mm:ss"
        theme-color="#0066ff"
        :is-blinking="true"
      />
    </section>

    <section class="demo-item">
      <h3>完整日期时间 - 蓝色主题无闪烁</h3>
      <FlipClock
        format="YYYY-MM-DD HH:mm:ss"
        theme-color="#0066ff"
        :is-blinking="false"
      />
    </section>

    <section class="demo-item">
      <h3>月日时间 - 紫色主题带闪烁</h3>
      <FlipClock
        format="MM-DD HH:mm:ss"
        theme-color="#cc00ff"
        :is-blinking="true"
      />
    </section>

    <section class="demo-item">
      <h3>月日时间 - 紫色主题无闪烁</h3>
      <FlipClock
        format="MM-DD HH:mm:ss"
        theme-color="#cc00ff"
        :is-blinking="false"
      />
    </section>

    <section class="demo-item">
      <h3>年月日 - 青色主题</h3>
      <FlipClock
        format="YYYY-MM-DD"
        theme-color="#00ffcc"
        :is-blinking="false"
      />
    </section>

    <section class="demo-item">
      <h3>时分 - 橙色主题带闪烁</h3>
      <FlipClock format="HH:mm" theme-color="#ff6600" :is-blinking="true" />
    </section>

    <section class="demo-item">
      <h3>年月 - 金色主题</h3>
      <FlipClock format="YYYY-MM" theme-color="#ffcc00" :is-blinking="false" />
    </section>

    <section class="demo-item">
      <h3>月日 - 粉色主题带闪烁</h3>
      <FlipClock format="MM-DD" theme-color="#ff0099" :is-blinking="true" />
    </section>

    <section class="demo-item">
      <h3>分秒 - 绿色主题带闪烁</h3>
      <FlipClock format="mm:ss" theme-color="#33cc33" :is-blinking="true" />
    </section>
  </div>
</template>

<script setup lang="ts">
import FlipClock from "@/components/FlipClock/FlipClock.vue";
</script>

<style scoped lang="scss">
.flip-clock-demo {
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0f2027 50%, #203a43 100%);
  position: relative;
}

.demo-item {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.demo-item h3 {
  margin-bottom: 20px;
  color: #fff;
  font-size: 16px;
  opacity: 0.8;
}
</style>
