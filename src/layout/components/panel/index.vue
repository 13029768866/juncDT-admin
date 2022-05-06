<template>
  <div :class="['right-panel-container', isShow ? 'show-panel' : '']">
    <div class="right-panel-background"></div>
    <div ref="target" class="right-panel">
      <div class="right-panel-items">
        <div class="project-configuration">
          <h3>项目配置</h3>
          <el-icon title="关闭配置" class="el-icon-close" @click="isShow = !isShow">
            <IconifyIconOffline icon="close" />
          </el-icon>
        </div>
        <div style="border-bottom: 1px solid #dcdfe6" />
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { events } from '/@/utils/mitt';
  import { onClickOutside } from '@vueuse/core';

  const isShow = ref(false);
  const target = ref(null);

  onClickOutside(target, (event) => {
    if (event.clientX > target.value.offsetLeft) return;
    isShow.value = false;
  });
  events.on('openPanel', () => {
    isShow.value = true;
  });
</script>

<style lang="scss" scoped>
  .right-panel-background {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
    background: rgba(0, 0, 0, 0.2);
    z-index: -1;
  }

  .right-panel {
    width: 100%;
    max-width: 315px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
    transform: translate(100%);
    background: #fff;
    z-index: 40000;
  }

  .show-panel {
    transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

    .right-panel-background {
      z-index: 20000;
      opacity: 1;
      width: 100%;
      height: 100%;
    }

    .right-panel {
      transform: translate(0);
    }
  }

  .handle-button {
    width: 48px;
    height: 48px;
    position: absolute;
    left: -48px;
    text-align: center;
    font-size: 24px;
    border-radius: 6px 0 0 6px !important;
    z-index: 0;
    pointer-events: auto;
    cursor: pointer;
    color: #fff;
    line-height: 48px;
    top: 45%;
    background: rgb(24, 144, 255);

    i {
      font-size: 24px;
      line-height: 48px;
    }
  }

  .right-panel-items {
    margin-top: 60px;
    height: calc(100vh - 60px);
    overflow-y: auto;
  }

  .project-configuration {
    display: flex;
    width: 100%;
    height: 30px;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    top: 15px;
    margin-left: 10px;

    i {
      font-size: 20px;
      margin-right: 20px;

      &:hover {
        cursor: pointer;
        color: var(--el-color-primary);
      }
    }
  }

  :deep(.el-divider--horizontal) {
    width: 90%;
    margin: 20px auto 0 auto;
  }
</style>
