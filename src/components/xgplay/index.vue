<template>
  <div class="xgplay-main">
    <div id="xgplay-container"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch, defineProps, defineExpose } from "vue";
import { Events } from "xgplayer";
import Player, { Plugin } from "xgplayer";
import HlsPlugin from "xgplayer-hls";

const props = defineProps<{
  url: string;
}>();

// 监听url变化
watch(() => props.url, (newUrl: string) => {
  if (!player.value) return;
  
  // 更新播放地址
  player.value.src = newUrl;  // 使用 src 而不是 url
  
  // 确保视频加载完成后播放
  player.value.once(Events.LOADED_DATA, () => {
    player.value.play().catch((err: any) => {
      console.error('自动播放失败:', err);
    });
  });
}, { immediate: false });

const player = ref<any>(null);
const initXgplay = () => {
  if (HlsPlugin.isSupported()) {
    player.value = new Player({
      el: document.getElementById("xgplay-container") as HTMLElement,
      plugins: [HlsPlugin],
      url: props.url,
      hls: {
        retryCount: 3, // 重试 3 次，默认值
        retryDelay: 1000, // 每次重试间隔 1 秒，默认值
        loadTimeout: 10000, // 请求超时时间为 10 秒，默认值
        fetchOptions: {
          // 该参数会透传给 fetch，默认值为 undefined
          mode: "cors",
        },
      },
      width: "100%",
      height: "100%",
      autoplay: true,
      muted: true,
      playsinline: true,
      poster: "https://cdn.seovx.com/ha/?mom=302", //封面 这里用于演示
      screenShot: true, // 截图
      rotate: true, //显示旋转按钮
      fullscreen: {
        position: Plugin.POSITIONS.CONTROLS_LEFT, // 定位在控制栏左侧
        index: 2, // 位置索引为2
      },
      marginControls: false, // 控制条是否盖住视频
      pip: true, //切换画中画
      download: true, //显示下载按钮
      mini: true, // 是否开启小窗播放
      lang: "zh-cn", // 语言
      videoFillMode: "contain",
      // fillHeight 填充高度，宽度溢出则裁剪宽度
      // fill 拉伸填充
      // contain 保持宽高比，缩放至一边填满容器，另一边将添加"黑边"
      // auto 默认值，同浏览器默认
    });

    // 开始拉流或者后续播放阶段时获取
    player.value.on(Events.LOAD_START, () => {
      console.log(player.value.plugins.hls.core.speedInfo()); // 调用方法
    });
    // 更换播放地址
    player.value.on(Events.URL_CHANGE, (url: any) => {
      console.log("更换播放地址", url);
    });
    // 播放结束
    player.value.on(Events.ENDED, () => {
      console.log("播放结束");
    });
    // 播放
    player.value.on(Events.PLAY, () => {
      console.log("播放");
    });
    // 播放进度
    player.value.on(Events.TIME_UPDATE, (time: number) => {
      console.log("播放进度", time);
    });
    // 音量发生变化
    player.value.on(Events.VOLUME_CHANGE, () => {
      console.log("音量发生变化");
    });
    // 播放暂停
    player.value.on(Events.PAUSE, () => {
      console.log("播放暂停");
    });
    // 错误
    player.value.on(Events.ERROR, () => {
      console.log("错误");
    });
    // 监听旋转事件
    player.value.on(Events.ROTATE, (rotateDeg: number) => {
      console.log("旋转角度", rotateDeg);
    });
    // 监听画中画状态
    player.value.on(Events.PIP_CHANGE, (pip: boolean) => {
      console.log("画中画状态", pip);
    });
    // 播放速率发生变化
    player.value.on(Events.RATE_CHANGE, (rate: number) => {
      console.log("播放速率", rate);
    });
    // 监听错误
    player.value.usePluginHooks(
      "error",
      "errorRetry",
      (plugin: any, ...args: any[]) => {
        console.log("错误", plugin, args);
      }
    );
    // 监听小窗状态
    player.value.on(Events.MINI_STATE_CHANGE, (isMini: boolean) => {
      if (isMini) {
        console.log("enter miniScreen");
      } else {
        console.log("exit miniScreen");
      }
    });
  }
};

const play = () => {
  if (!player.value) return;
  player.value.play().catch((err: any) => {
    console.error('播放失败:', err);
  });
};

const pause = () => {
  if (!player.value) return;
  player.value.pause();
};

onMounted(() => {
  initXgplay();
});
// 页面卸载
onUnmounted(() => {
  console.log("页面卸载");
  if (player.value) {
    // 先暂停播放
    player.value.pause();
    // 移除所有事件监听
    player.value.off(Events.LOAD_START);
    player.value.off(Events.URL_CHANGE);
    player.value.off(Events.ENDED);
    player.value.off(Events.PLAY);
    player.value.off(Events.TIME_UPDATE);
    player.value.off(Events.VOLUME_CHANGE);
    player.value.off(Events.PAUSE);
    player.value.off(Events.ERROR);
    player.value.off(Events.ROTATE);
    player.value.off(Events.PIP_CHANGE);
    player.value.off(Events.RATE_CHANGE);
    player.value.off(Events.MINI_STATE_CHANGE);
    // 销毁播放器实例
    player.value.destroy();
    // 清空引用
    player.value = null;
  }
});

defineExpose({
  play,
  pause
});
</script>

<style scoped lang="scss">
.xgplay-main {
  width: 100%;
  height: 100%;
  #xgplay-container {
    width: 100%;
    height: 100%;
  }
}
</style>
