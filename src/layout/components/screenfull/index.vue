<template>
  <div class="screen-full" @click="toggle">
    <FontIcon
      :title="isFullscreen ? '退出全屏' : '全屏'"
      :icon="isFullscreen ? 'team-iconexit-fullscreen' : 'team-iconfullscreen'"
    ></FontIcon>
  </div>
</template>

<script setup>
  import { useFullscreen } from '@vueuse/core';
  const { isFullscreen, toggle } = useFullscreen();
</script>

<style lang="scss" scoped>
  .screen-full {
    width: 36px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>
