<template>
  <div class="app-wrapper">
    <!--  侧边栏  -->
    <Vertical />
    <!--  main容器  -->
    <div :class="['main-container']">
      <div class="fixed-header">
        <layout-header />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script setup>
  import Vertical from './components/sidebar/vertical.vue';
  import LayoutHeader from './components/layoutHeader.vue';
  import AppMain from './components/appMain.vue';
</script>

<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 998;
      width: calc(100% - 210px);
      transition: width 0.28s;
    }
  }
</style>
