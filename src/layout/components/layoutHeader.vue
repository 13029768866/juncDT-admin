<template>
  <div>
    <Navbar v-if="layout.includes('vertical')" />
    <Horizontal v-else />
    <Tag />
  </div>
</template>

<script setup>
  import Navbar from './navbar.vue';
  import Horizontal from './sidebar/horizontal.vue';
  import Tag from './tag/index.vue';

  const instance = getCurrentInstance().appContext.app.config.globalProperties;

  const layout = computed(() => {
    return instance.$storage?.layout.layout;
  });
</script>

<style scoped></style>
