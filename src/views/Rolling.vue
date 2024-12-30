<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="rolling-demo">
    
    <section class="demo-item">
      <h3>默认蓝色主题</h3>
      <RollingDisplay
        :data="notices"
        direction="horizontal"
        :speed="50"
        :hover-pause="true"
        width="300px"
        height="60px"
      />
    </section>

    <section class="demo-item">
      <h3>绿色科技主题</h3>
      <RollingDisplay
        :data="verticalNotices"
        direction="vertical"
        :speed="40"
        :hover-pause="true"
        width="300px"
        height="120px"
        theme="#00ff88"
      />
    </section>

    <section class="demo-item">
      <h3>紫色未来主题</h3>
      <RollingDisplay
        :data="customNotices"
        direction="horizontal"
        :speed="30"
        :hover-pause="true"
        width="400px"
        height="80px"
        theme="#cc00ff"
      />
    </section>

    <section class="demo-item">
      <h3>红色警告主题</h3>
      <RollingDisplay
        :data="newsNotices"
        direction="vertical"
        :speed="60"
        :hover-pause="true"
        width="500px"
        height="40px"
        theme="#ff0066"
      />
    </section>

    <section class="demo-item">
      <h3>橙色活力主题</h3>
      <RollingDisplay
        :data="mixedNotices"
        direction="horizontal"
        :speed="45"
        :hover-pause="true"
        width="400px"
        height="80px"
        theme="#ff9900"
      />
    </section>

    <section class="demo-item">
      <h3>青色海洋主题</h3>
      <RollingDisplay
        :data="notices"
        direction="horizontal"
        :speed="35"
        :hover-pause="true"
        width="350px"
        height="70px"
        theme="#00e5ff"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import RollingDisplay from "@/components/rollingDisplay/index.vue";

interface RollingItem {
  text?: string;
  image?: string;
}

// 基础通知
const notices: RollingItem[] = [
  { text: "消息1", image: "https://cdn.seovx.com/ha/?mom=302" },
  { text: "消息2", image: "https://cdn.seovx.com/ha/?mom=302" },
  { text: "消息3", image: "https://cdn.seovx.com/ha/?mom=302" },
];

// 垂直滚动通知
const verticalNotices: RollingItem[] = [
  { text: "今日天气：晴朗" },
  { text: "温度：25°C" },
  { text: "湿度：65%" },
  { text: "空气质量：优" },
];

// 自定义样式通知
const customNotices: RollingItem[] = [
  { text: "🎉 新功能上线通知", image: "https://cdn.seovx.com/ha/?mom=302" },
  { text: "⭐ 系统更新提醒", image: "https://cdn.seovx.com/ha/?mom=302" },
  { text: "📢 重要公告", image: "https://cdn.seovx.com/ha/?mom=302" },
];

// 新闻通知
const newsNotices: RollingItem[] = [
  { text: "【科技】最新AI技术突破性进展" },
  { text: "【财经】全球股市创新高" },
  { text: "【体育】世界杯精彩赛事回顾" },
  { text: "【文化】新型艺术展览开幕" },
];

// 图文混合通知
const mixedNotices: RollingItem[] = [
  { text: "系统维护通知", image: "https://cdn.seovx.com/ha/?mom=302" },
  { text: "安全更新提醒", image: "https://cdn.seovx.com/ha/?mom=302" },
  { text: "新版本发布", image: "https://cdn.seovx.com/ha/?mom=302" },
  { text: "用户反馈", image: "https://cdn.seovx.com/ha/?mom=302" },
];
</script>

<style scoped>
.rolling-demo {
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #1a1a1a 0%,
    #0f2027 50%,
    #203a43 100%
  );
  position: relative;
  overflow: hidden;
}

/* 添加炫光效果 */
.rolling-demo::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(0, 150, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.demo-item {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 24px -1px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
}

/* 添加悬停效果 */
.demo-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

.demo-item h3 {
  margin-bottom: 15px;
  color: #fff;
  font-size: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
}

/* 添加标题装饰 */
.demo-item h3::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 50%;
  width: 12px;
  height: 2px;
  background: linear-gradient(90deg, #00ff88, transparent);
  transform: translateY(-50%);
}

/* 响应式布局 */
@media screen and (max-width: 768px) {
  .demo-item {
    padding: 15px;
  }
  
  .rolling-display {
    width: 100% !important;
  }
}
</style>
