<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <div class="sidebar" :class="{ collapsed: isCollapsed }">
      <div class="logo-container">
        <h2 class="cyber-logo">
          <span class="logo-text">Author</span>
          <span class="logo-highlight">lv</span>
        </h2>
        <button class="collapse-btn" @click="toggleSidebar" :title="isCollapsed ? '展开' : '收起'">
          <span v-if="isCollapsed">▶</span>
          <span v-else>◀</span>
        </button>
      </div>
      <ul class="nav-list">
        <li v-for="route in menuRoutes" :key="route.path">
          <router-link
            :to="route.path"
            class="nav-link"
            :class="{ active: currentPath === route.path }"
            @click="handleNavClick(route.path)"
          >
            <div class="link-content">
              <div class="link-glow"></div>
              <div class="link-border"></div>
              <span class="link-text">{{
                route.meta?.title || route.name || route.path
              }}</span>
              <div class="link-icon">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <div class="sidebar-footer">
        <div class="system-status">
          <div class="status-dot"></div>
          <span class="status-text">System Online</span>
        </div>
      </div>
    </div>
    <!-- 主内容区 -->
    <div class="main-content">
      <router-view></router-view>
      <!-- <transition name="fade" mode="out-in"> </transition> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const currentPath = ref(route.path);
const isCollapsed = ref(false);

const menuRoutes = computed(() => {
  const rootRoute = router.getRoutes().find((route) => route.path === "/");
  return (
    rootRoute?.children?.filter((route) => {
      return !route.path.includes("*");
    }) || []
  );
});

const handleNavClick = (path: string) => {
  currentPath.value = path;
  router.push(path);
};

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  background: #0a0a0a;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  background: linear-gradient(180deg, #1a1f2c 0%, #121620 100%);
  padding: 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.3);
  transition: width 0.2s ease, padding 0.2s ease;
}

.sidebar.collapsed {
  width: 64px;
  padding: 20px 12px;
}

.logo-container {
  margin-bottom: 40px;
  padding: 20px 0;
  text-align: center;
  position: relative;
}

.cyber-logo {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 5px;
}

.sidebar.collapsed .cyber-logo .logo-text,
.sidebar.collapsed .cyber-logo .logo-highlight {
  display: none;
}

.collapse-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  color: #cfe9ff;
  border: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
}

.logo-text {
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.logo-highlight {
  color: transparent;
  background: linear-gradient(90deg, #00ff88, #00a3ff);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
}

.nav-link {
  display: block;
  text-decoration: none;
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
}

.link-content {
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar.collapsed .link-content {
  justify-content: center;
  padding: 12px 12px;
}

.link-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at var(--x, 50%) var(--y, 50%),
    rgba(0, 255, 136, 0.1) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.link-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, #00ff88, #00a3ff);
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
}

.link-text {
  color: #8892b0;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  z-index: 1;
}

.sidebar.collapsed .link-text {
  display: none;
}

.link-icon {
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  color: #00ff88;
}

.nav-link:hover .link-content {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}

.nav-link:hover .link-glow {
  opacity: 1;
}

.nav-link:hover .link-border {
  opacity: 1;
}

.nav-link:hover .link-text {
  color: #fff;
}

.nav-link:hover .link-icon {
  opacity: 1;
  transform: translateX(0);
}

.nav-link.active .link-content {
  background: rgba(0, 255, 136, 0.05);
  border-color: rgba(0, 255, 136, 0.2);
}

.nav-link.active .link-border {
  opacity: 1;
}

.nav-link.active .link-text {
  color: #00ff88;
}

.nav-link.active .link-icon {
  opacity: 1;
  transform: translateX(0);
}

.sidebar-footer {
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.system-status {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
  animation: pulse 2s infinite;
}

.status-text {
  color: #8892b0;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.main-content {
  flex: 1;
  position: relative;
  overflow-y: auto;
  background: #0a0a0a;
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 鼠标悬停光晕效果 */
.nav-link {
  --x: 50%;
  --y: 50%;
}

.nav-link:hover {
  --x: var(--mouse-x, 50%);
  --y: var(--mouse-y, 50%);
}

/* 滚动条样式 */
.nav-list::-webkit-scrollbar {
  width: 6px;
}

.nav-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}

.nav-list::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 136, 0.2);
  border-radius: 3px;
}

.nav-list::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 136, 0.4);
}
.main-content::-webkit-scrollbar {
  width: 6px;
}

.main-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}

.main-content::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 136, 0.2);
  border-radius: 3px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 136, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    width: 220px;
  }

  .cyber-logo {
    font-size: 1.5rem;
  }

  .link-content {
    padding: 10px 15px;
  }
}
</style>
