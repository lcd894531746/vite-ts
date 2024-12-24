<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <ul class="nav-list">
        <li v-for="route in menuRoutes" :key="route.path">
          <router-link :to="route.path">
            {{ route.meta?.title || route.name || route.path }}
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 主内容区 -->
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const menuRoutes = computed(() => {
  // 获取根路由的子路由
  const rootRoute = router.getRoutes().find(route => route.path === '/');
  return rootRoute?.children?.filter(route => {
    // 过滤掉不需要显示的路由
    return !route.path.includes('*');
  }) || [];
});
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  margin-bottom: 10px;
}

.nav-list a {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-list a:hover {
  background-color: #e0e0e0;
}

.nav-list a.router-link-active {
  background-color: #007bff;
  color: white;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
