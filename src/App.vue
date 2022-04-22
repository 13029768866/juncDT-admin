<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  {{ count }}
  <el-button @click="add">css添加</el-button>
</template>

<script setup>
  const count = ref(1);
  const add = () => {
    count.value++;
  };
</script>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
