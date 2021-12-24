<script setup>
  import SvgIcon from './components/SvgIcon/index.vue';
</script>

<template>
  模 板
  <a-button>234</a-button>
  <div class="test">
    <SvgIcon name="no-data"></SvgIcon>
  </div>
  <div class="test">
    <SvgIcon name="eye" color="red"></SvgIcon>
    <SvgIcon name="/test/eye-open" color="red"></SvgIcon>
  </div>
</template>

<style>
  .test {
    border: 1px solid #000;
  }
</style>
