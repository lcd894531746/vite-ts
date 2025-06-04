<template>
  <div class="container">
    <h1>WebSocket 视频流播放</h1>
    <div class="video-container">
      <canvas id="video"></canvas>
    </div>
    <div class="controls">
      <el-button type="primary" @click="connectWebSocket">连接</el-button>
      <el-button type="danger" @click="disconnectWebSocket">断开</el-button>
    </div>
    <div class="status" :style="{ color: statusColor }">{{ statusText }}</div>
  </div>
</template>

<script setup>
import JSMpeg from 'jsmpeg-player'
import axios from 'axios'
import { onMounted, onBeforeUnmount, ref } from 'vue'

const statusText = ref('未连接')
const statusColor = ref('#666')
let player = null

async function connectWebSocket() {
  try {
    // 获取 WebSocket 地址
    const response = await axios.get('http://127.0.0.1:9001/rtmpToWebsocket')
    const wsUrl = response.data.wsUrl

    // 如果已经有播放器实例，先销毁
    if (player) {
      player.destroy()
    }

    // 创建新的播放器实例
    player = new JSMpeg.Player(wsUrl, {
      canvas: document.getElementById('video'),
      bufferSize: 8,
      videoBufferSize: 20484096,
      onSourceEstablished: () => {
        statusText.value = '已连接'
        statusColor.value = '#4CAF50'
      },
      onSourceCompleted: () => {
        statusText.value = '连接已断开'
        statusColor.value = '#f44336'
      },
      onError: (error) => {
        console.error('播放器错误:', error)
        statusText.value = '连接错误'
        statusColor.value = '#f44336'
      }
    })
  } catch (error) {
    console.error('连接错误:', error)
    statusText.value = '连接失败'
    statusColor.value = '#f44336'
  }
}

async function disconnectWebSocket() {
  if (player) {
    player.destroy()
    player = null
    statusText.value = '已断开连接'
    statusColor.value = '#666'
    try {
      await axios.get('http://127.0.0.1:9001/cleraWsAll')
    } catch (error) {
      console.error('清理 WebSocket 失败:', error)
    }
  }
}

onBeforeUnmount(() => {
  if (player) {
    player.destroy()
  }
})
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

.video-container {
  width: 100%;
  margin: 20px 0;
}

canvas {
  width: 100%;
  height: auto;
  background-color: #000;
  border-radius: 4px;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

.status {
  text-align: center;
  margin-top: 10px;
}
</style>




