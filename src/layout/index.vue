<template>
  <div class="app-wrapper">
    <!--  侧边栏  -->
    <Vertical />
    <!--  main容器  -->
    <div :class="['main-container']">
      <layout-header />
    </div>
  </div>
</template>

<script setup>
  import Vertical from './components/sidebar/vertical.vue';
  import LayoutHeader from './components/layoutHeader.vue';
</script>

<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
