<template>
  <div class="screen-full" @click="toggle">
    <FontIcon
      :title="isFullscreen ? t('buttons.exitfullscreen') : t('buttons.fullscreen')"
      :icon="isFullscreen ? 'team-iconexit-fullscreen' : 'team-iconfullscreen'"
    ></FontIcon>
  </div>
</template>

<script setup>
  import { useFullscreen } from '@vueuse/core';
  import { useI18n } from 'vue-i18n';

  const { isFullscreen, toggle } = useFullscreen();
  const { t } = useI18n();
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
