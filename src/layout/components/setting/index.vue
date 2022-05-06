<template>
  <panel>
    <el-divider>主题</el-divider>
    <el-switch
      v-model="dataTheme"
      class="pure-datatheme"
      inline-prompt
      :active-icon="dayIcon"
      :inactive-icon="darkIcon"
      @change="dataThemeChange"
    ></el-switch>
  </panel>
</template>

<script setup>
  import panel from '../panel/index.vue';

  import dayIcon from '/@/assets/svg/day.svg?component';
  import darkIcon from '/@/assets/svg/dark.svg?component';

  const instance = getCurrentInstance().appContext.app.config.globalProperties.$storage;

  /* 主题start */
  const dataTheme = ref(instance.layout.darkMode);
  const dataThemeChange = () => {
    console.log('主题切换');
  };
  /* 主题end */
  console.log('instance', instance);
</script>

<style scoped></style>
