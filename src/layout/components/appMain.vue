<template>
  <section :class="['app-main']">
    <router-view></router-view>
  </section>
</template>

<script setup></script>

<style scoped>
  .app-main {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow-x: hidden;
    padding-top: 85px;
  }
</style>
