<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <!-- 星空背景 -->
    <div class="stars">
      <div class="star-group-1"></div>
      <div class="star-group-2"></div>
      <div class="star-group-3"></div>
      <div class="cyber-grid"></div>
    </div>
    
    <div class="content">
      <div class="title-container">
        <h1 class="cyber-title">Welcome to Future</h1>
        <div class="subtitle">Next Generation Technology Platform</div>
      </div>

      <div class="cards-container">
        <div
          class="card"
          v-for="(card, index) in cards"
          :key="index"
          @mousemove="handleMouseMove($event, index)"
          @mouseleave="handleMouseLeave(index)"
          :style="getCardStyle(index)"
          @click="handleCardClick(card.path)"
        >
          <div class="card-content">
            <el-icon class="card-icon" :size="40">
              <component :is="card.icon" />
            </el-icon>
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
          </div>
          <div class="card-shine"></div>
        </div>
      </div>

      <div class="stats-container">
        <div class="stat-item" v-for="(stat, index) in stats" :key="index">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Monitor,
  DataLine,
  Connection,
  Setting,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 卡片数据
const cards = ref([
  {
    title: "实时监控",
    description: "智能数据分析和监控系统",
    icon: Monitor,
    transform: { rotateX: 0, rotateY: 0 },
    path: "/table",
  },
  {
    title: "数据分析",
    description: "深度学习算法支持",
    icon: DataLine,
    transform: { rotateX: 0, rotateY: 0 },
    path: "/echarts",
  },
  {
    title: "智能连接",
    description: "高效的物联网解决方案",
    icon: Connection,
    transform: { rotateX: 0, rotateY: 0 },
    path: "/Rolling",
  },
  {
    title: "系统配置",
    description: "灵活的定制化设置",
    icon: Setting,
    transform: { rotateX: 0, rotateY: 0 },
    path: "/tiandi",
  },
]);

// 统计数据
const stats = ref([
  { value: "99.9%", label: "系统稳定性" },
  { value: "10TB+", label: "数据处理量" },
  { value: "5000+", label: "活跃用户" },
  { value: "24/7", label: "全天候支持" },
]);

// 3D 卡片效果
const handleMouseMove = (event: MouseEvent, index: number) => {
  const card = event.currentTarget as HTMLElement;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * 10;
  const rotateY = ((x - centerX) / centerX) * 10;

  cards.value[index].transform = { rotateX, rotateY };
};

const handleMouseLeave = (index: number) => {
  cards.value[index].transform = { rotateX: 0, rotateY: 0 };
};

const getCardStyle = (index: number) => {
  const { rotateX, rotateY } = cards.value[index].transform;
  return {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
  };
};

// 卡片点击处理
const handleCardClick = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
.home {
  min-height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a192f 100%);
  position: relative;
  overflow: hidden;
  color: white;
}

/* 星空背景 */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.star-group-1,
.star-group-2,
.star-group-3 {
  position: absolute;
  width: 200%;
  height: 200%;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #fff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 50px 160px, #fff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 200px 200px;
}

.star-group-1 {
  animation: twinkle 2s infinite, flow1 40s linear infinite;
}

.star-group-2 {
  animation: twinkle 2s infinite 0.6s, flow2 35s linear infinite;
  background-position: 40px 60px;
}

.star-group-3 {
  animation: twinkle 2s infinite 1.2s, flow3 45s linear infinite;
  background-position: 80px 120px;
}

@keyframes twinkle {
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
}

@keyframes flow1 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-30%, -40%);
  }
}

@keyframes flow2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-40%, -20%);
  }
}

@keyframes flow3 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-20%, -50%);
  }
}

/* 赛博格栅 */
.cyber-grid {
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background-image: 
    linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  transform: perspective(500px) rotateX(60deg);
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% {
    transform: perspective(500px) rotateX(60deg) translateY(0);
  }
  100% {
    transform: perspective(500px) rotateX(60deg) translateY(40px);
  }
}

/* 内容层 */
.content {
  position: relative;
  z-index: 2;
  padding: 2rem;
}

/* 标题容器 */
.title-container {
  text-align: center;
  margin-bottom: 4rem;
  animation: fade-in-up 1s ease-out;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cyber-title {
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(90deg, #00ff88, #00a3ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  position: relative;
}

.cyber-title::after {
  content: attr(data-text);
  position: absolute;
  left: 2px;
  text-shadow: -1px 0 #00ff88;
  top: 0;
  color: transparent;
  background: none;
  animation: glitch 1s infinite;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
}

@keyframes glitch {
  2%, 64% { transform: translate(2px,0) skew(0deg); }
  4%, 60% { transform: translate(-2px,0) skew(0deg); }
  62% { transform: translate(0,0) skew(5deg); }
}

.subtitle {
  font-size: 1.5rem;
  color: #8892b0;
  margin-top: 1rem;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card-content {
  position: relative;
  z-index: 1;
}

.card-icon {
  color: #00ff88;
  margin-bottom: 1rem;
}

.card h3 {
  color: #fff;
  margin-bottom: 0.5rem;
}

.card p {
  color: #8892b0;
  font-size: 0.9rem;
}

.card-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 60%
  );
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.card:hover .card-shine {
  transform: translateY(0);
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  padding: 2rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #00ff88;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #8892b0;
  font-size: 1rem;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

@media (max-width: 768px) {
  .cyber-title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .cards-container {
    grid-template-columns: 1fr;
  }

  .stats-container {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
