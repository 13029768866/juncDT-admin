<template>
  <panel>
    <el-divider>主题</el-divider>
    <el-switch
      v-model="dataTheme"
      class="theme-mode"
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
  // 存放夜间主题切换前的导航主题色
  // eslint-disable-next-line no-unused-vars
  let tempLayoutThemeColor;

  const dataTheme = ref(instance.layout.darkMode);
  // 设置主题色
  const setLayoutThemeColor = (theme) => {
    tempLayoutThemeColor = instance.layout.theme;
    layoutTheme.value.theme = theme;
    instance.layout = {
      theme,
      darkMode: dataTheme.value,
      sidebarStatus: instance.layout.sidebarStatus,
    };
  };
  const dataThemeChange = () => {
    setLayoutThemeColor();
  };
  /* 主题end */
  console.log('instance', instance);
</script>

<style lang="scss" scoped>
  .theme-mode {
    width: 100%;
    height: 50px;
    text-align: center;
    display: block;
    padding-top: 25px;
  }

  :deep(.el-divider__text) {
    font-size: 16px;
    font-weight: 700;
  }
</style>
