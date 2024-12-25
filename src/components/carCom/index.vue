<template>
  <!-- 标题 -->
  <div :style="headerStyle" class="head-content default-head-icon">
    <slot name="header">{{ headerTitle }}</slot>
  </div>
  <div class="tech-card" :class="[type, { 'separate-header': separateHeader }]">
    <div class="scan-line"></div>
    <div class="card-header" :style="contentheaderStyle">
      <slot name="contentheader">
        <div class="header-content">
          <div class="title-area">
            <div class="header-icon" v-if="showIcon">
              <i v-if="icon" :class="icon" class="custom-icon"></i>
              <i v-else class="default-icon"></i>
            </div>
            <h3>{{ title }}</h3>
          </div>
          <div class="header-extra">
            <slot name="extra"></slot>
          </div>
        </div>
      </slot>
    </div>
    <div class="card-body">
      <slot name="content">
        <div class="empty-content">
          <svg class="empty-icon" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 4L4 14L24 24L44 14L24 4Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M4 14V34L24 44M24 44L44 34V14M24 44V24"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M24 14C24 14 29 19 34 19C39 19 44 14 44 14"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
          <span class="empty-text">暂无数据</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  headerTitle: {
    type: String,
    default: "头部",
  },
  title: {
    type: String,
    default: "数据监控",
  },
  headerStyle: {
    type: Object,
    default: {},
  },
  contentheaderStyle: {
    type: Object,
    default: {},
  },

  type: {
    type: String,
    default: "primary",
  },
  value: {
    type: [Number, String],
    default: "256",
  },
  separateHeader: {
    type: Boolean,
    default: false,
  },

  showIcon: {
    type: Boolean,
    default: true,
  },

  icon: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.tech-card {
  background: linear-gradient(
    145deg,
    rgba(16, 20, 24, 0.9),
    rgba(23, 32, 38, 0.8)
  );
  border: 1px solid rgba(32, 147, 255, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  min-width: 280px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  // 主题色
  &.primary {
    --theme-color: #2093ff;
  }
  &.success {
    --theme-color: #42b883;
  }
  &.warning {
    --theme-color: #e6a23c;
  }
  &.danger {
    --theme-color: #f56c6c;
  }

  // 扫描线动画
  .scan-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--theme-color),
      transparent
    );
    opacity: 0;
    transform: translateX(-100%);
    animation: scanLine 3s ease-in-out infinite;
  }

  .card-header {
    padding: 16px 20px;
    border-bottom: 1px solid rgba(32, 147, 255, 0.2);
    position: relative;
    transition: background-color 0.3s;

    &::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 50%;
      width: 0;
      height: 1px;
      background: var(--theme-color);
      transition: all 0.3s ease;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title-area {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .header-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: rgba(32, 147, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;

        .custom-icon {
          font-size: 20px;
          color: var(--theme-color);
          transition: transform 0.3s ease;
        }

        .default-icon {
          width: 20px;
          height: 20px;
          background: var(--theme-color);
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E")
            no-repeat center;
          mask-size: contain;
          transition: transform 0.3s ease;
        }
      }

      h3 {
        color: var(--theme-color);
        font-size: 18px;
        margin: 0;
        font-weight: 500;
        position: relative;
        transition: transform 0.3s ease;
      }
    }
  }

  .card-body {
    padding: 20px;
    transition: transform 0.3s ease;

    .empty-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 160px;
      padding: 24px;

      .empty-icon {
        width: 64px;
        height: 64px;
        margin-bottom: 12px;
        color: rgba(255, 255, 255, 0.15);
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: all 0.3s ease;
      }

      .empty-text {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.3);
        font-weight: 500;
        position: relative;
        padding: 0 12px;

        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 20px;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        &::before {
          right: 100%;
        }

        &::after {
          left: 100%;
        }
      }
    }
  }

  // 悬浮效果
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-color: var(--theme-color);

    .scan-line {
      opacity: 1;
    }

    .card-header {
      &::after {
        left: 0;
        width: 100%;
      }

      .header-icon {
        transform: rotate(360deg);

        .default-icon {
          transform: scale(1.1);
        }
      }

      h3 {
        transform: translateX(4px);
      }
    }

    // .card-body {
    //   .data-value {
    //     transform: scale(1.02);
    //   }

    //   .data-trend {
    //     transform: translateX(4px);
    //   }
    // }

    .empty-content {
      .empty-icon {
        color: rgba(255, 255, 255, 0.25);
        transform: translateY(-2px);
      }

      .empty-text {
        color: rgba(255, 255, 255, 0.4);

        &::before,
        &::after {
          background: rgba(255, 255, 255, 0.15);
        }
      }
    }
  }
}

@keyframes scanLine {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
}
.head-content {
  width: 100%;
  height: 50px;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat !important;
  margin-bottom: 20px;
  color: #2093ff;
  line-height: 60px;
  padding-left: 30px;
  font-size: 18px;
  font-weight: 700;
}
.default-head-icon {
  background-image: url("./car-bg.webp");
}
</style>
