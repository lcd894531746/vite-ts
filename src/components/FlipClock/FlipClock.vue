<template>
  <div class="FlipClock">
    <template v-for="(item, index) in displayItems" :key="index">
      <template v-if="item.type === 'number'">
        <Flipper
          :index="`${randomNumber}_${index}`"
          :ref="(el) => addFlipper(el, index)"
          :theme-color="themeColor"
          :class="item.class"
        />
      </template>
      <template v-else>
        <em
          class="separator"
          :style="{
            color: themeColor,
            opacity: item.value === ':' && isBlinking ? separatorOpacity : 1,
          }"
          >{{ item.value }}</em
        >
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import Flipper from "./Flipper.vue";

interface FlipperInstance {
  setFront: (val: string) => void;
  flipDown: (front: string, back: string) => void;
}

interface DisplayItem {
  type: "number" | "separator";
  value: string;
}

interface Props {
  themeColor?: string;
  isBlinking?: boolean;
  format?: string;
}

const props = withDefaults(defineProps<Props>(), {
  themeColor: "#00ff88",
  isBlinking: true,
  format: "HH:mm:ss",
});

const timer = ref<number | null>(null);
const separatorOpacity = ref(1);
const flippers = ref<Map<number, FlipperInstance>>(new Map());

// 随机数字 以防止重复
const randomNumber = ref(0);

// 解析格式字符串，生成显示项
const displayItems = computed(() => {
  const items: DisplayItem[] = [];
  const format = props.format;
  let i = 0;

  while (i < format.length) {
    const char = format[i];

    switch (char) {
      case "Y":
        // 年份显示4位数
        for (let j = 0; j < 4; j++) {
          items.push({
            type: "number",
            value: "",
            class: `date date_item_${randomNumber.value} year`,
          });
        }
        i += 4; // 跳过 YYYY
        break;
      case "M":
        // 月份两位数
        for (let j = 0; j < 2; j++) {
          items.push({
            type: "number",
            value: "",
            class: `date date_item_${randomNumber.value} month`,
          });
        }
        i += 2;
        break;
      case "D":
        // 日期两位数
        for (let j = 0; j < 2; j++) {
          items.push({
            type: "number",
            value: "",
            class: `date date_item_${randomNumber.value} day`,
          });
        }
        i += 2;
        break;
      case "H":
        // 小时两位数
        for (let j = 0; j < 2; j++) {
          items.push({
            type: "number",
            value: "",
            class: `time time_item_${randomNumber.value} hour`,
          });
        }
        i += 2;
        break;
      case "m":
        // 分钟两位数
        for (let j = 0; j < 2; j++) {
          items.push({
            type: "number",
            value: "",
            class: `time time_item_${randomNumber.value} minute`,
          });
        }
        i += 2;
        break;
      case "s":
        // 秒数两位数
        for (let j = 0; j < 2; j++) {
          items.push({
            type: "number",
            value: "",
            class: `time time_item_${randomNumber.value} second`,
          });
        }
        i += 2;
        break;
      default:
        // 分隔符
        items.push({ type: "separator", value: char });
        i++;
        break;
    }
  }
  return items;
});

// 添加 Flipper 实例
const addFlipper = (el: any, index: number) => {
  if (el) {
    flippers.value.set(index, el);
  }
};

// 获取所有翻牌器实例
const getFlipObjs = (): FlipperInstance[] => {
  return Array.from(flippers.value.values());
};

// 格式化日期
const formatDate = (date: Date, format: string): string => {
  const values: string[] = [];
  let i = 0;

  while (i < format.length) {
    const char = format[i];

    switch (char) {
      case "Y":
        // 年份固定4位
        values.push(
          ...date.getFullYear().toString().padStart(4, "0").split("")
        );
        i += 4;
        break;
      case "M":
        values.push(
          ...(date.getMonth() + 1).toString().padStart(2, "0").split("")
        );
        i += 2;
        break;
      case "D":
        values.push(...date.getDate().toString().padStart(2, "0").split(""));
        i += 2;
        break;
      case "H":
        values.push(...date.getHours().toString().padStart(2, "0").split(""));
        i += 2;
        break;
      case "m":
        values.push(...date.getMinutes().toString().padStart(2, "0").split(""));
        i += 2;
        break;
      case "s":
        values.push(...date.getSeconds().toString().padStart(2, "0").split(""));
        i += 2;
        break;
      default:
        // 跳过分隔符
        i++;
        break;
    }
  }

  return values.join("");
};

// 初始化数字
const init = () => {
  const now = new Date();
  const timeStr = formatDate(now, props.format);
  const flipObjs = getFlipObjs();

  flipObjs.forEach((flipper, index) => {
    if (flipper && timeStr[index] !== undefined) {
      flipper.setFront(timeStr[index]);
    }
  });
};

// 开始计时
const run = () => {
  timer.value = window.setInterval(() => {
    const now = new Date();
    const prevTime = new Date(now.getTime() - 1000);
    const prevTimeStr = formatDate(prevTime, props.format);
    const currentTimeStr = formatDate(now, props.format);
    const flipObjs = getFlipObjs();

    if (props.isBlinking) {
      separatorOpacity.value = 0.2;
      setTimeout(() => {
        separatorOpacity.value = 1;
      }, 500);
    }

    flipObjs.forEach((flipper, index) => {
      if (flipper && prevTimeStr[index] !== currentTimeStr[index]) {
        flipper.flipDown(prevTimeStr[index], currentTimeStr[index]);
      }
    });
  }, 1000);
};

// 设置空格 
const setSpace = () => {
  //  获取所有翻牌器实例
  const flipDom = document.querySelectorAll(`.date_item_${randomNumber.value}`);
  console.log("日期翻牌器", flipDom);
  const timeDom = document.querySelectorAll(`.time_item_${randomNumber.value}`);
  if (flipDom.length > 0 && timeDom.length > 0) {
    flipDom[flipDom.length - 1].style.marginRight = "30px";
  }
};

// 生命周期钩子
onMounted(() => {
  randomNumber.value = Math.floor(Math.random() * 100000); // 随机5位数 以防止重复
  // 使用 nextTick 确保子组件都已经挂载
  nextTick(() => {
    setSpace();
    init();
    run();
  });
});

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
    timer.value = null;
  }
});
</script>

<style scoped>
.FlipClock {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
}

.FlipClock :deep(.M-Flipper) {
  margin: 0 3px;
}

.separator {
  display: inline-block;
  line-height: 102px;
  font-size: 66px;
  font-style: normal;
  vertical-align: top;
  transition: opacity 0.2s;
}
</style>
