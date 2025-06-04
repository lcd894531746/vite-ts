<script setup>
// jsmpeg播放器
import JSMpeg from 'jsmpeg-player'
import axios from 'axios'
import { onMounted, onBeforeUnmount, ref } from 'vue'
let videoDom = null
let wsport = 0
onMounted(() => {
    axios.get(`http://127.0.0.1:9001/rtmpToWebsocket`).then((res) => {
        console.log('ws:', res)
        console.log('wsUrl:', res.data.wsUrl)
        wsport = res.data.port
        videoDom = new JSMpeg.Player(res.data.wsUrl, {
            bufferSize: 8,
            videoBufferSize: 20484096,
            canvas: document.getElementById('video')
        })
    })
})
onBeforeUnmount(() => {
    if (videoDom) {
        videoDom.stop()
        videoDom.destroy();
        console.log('视频连接已关闭');
    }
})
</script>
<template>
    <canvas :id="video" style="width: 100%; height: 100%"></canvas>
</template>