<template>
  <div class="app-wrapper">
    <Vertical />
  </div>
</template>

<script setup>
  import Vertical from './components/sidebar/vertical.vue';
</script>

<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
