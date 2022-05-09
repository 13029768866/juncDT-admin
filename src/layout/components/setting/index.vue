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

    <!-- 主题色 -->
    <el-divider v-show="!dataTheme">主题色</el-divider>
    <ul class="theme-color" v-show="!dataTheme">
      <li
        v-for="(item, index) in themeColors"
        :key="index"
        :style="getThemeColorStyle(item.color)"
        @click="setLayoutThemeColor(item.themeColor)"
      >
        <el-icon style="margin: 0.1em 0.1em 0 0" :size="17" :color="getThemeColor(item.themeColor)">
          <IconifyIconOffline icon="check" />
        </el-icon>
      </li>
    </ul>
  </panel>
</template>

<script setup>
  import { storageLocal } from '/@/utils/storage';
  import { toggleTheme } from '@pureadmin/theme/dist/browser-utils';
  import panel from '../panel/index.vue';

  import dayIcon from '/@/assets/svg/day.svg?component';
  import darkIcon from '/@/assets/svg/dark.svg?component';

  const instance = getCurrentInstance().appContext.app.config.globalProperties.$storage;
  const instanceConfig = getCurrentInstance().appContext.app.config.globalProperties.$config;

  /* 主题start */
  const body = document.documentElement;
  let layoutTheme =
    ref(storageLocal.getItem('responsive-layout')) ||
    ref({
      layout: instanceConfig?.Layout ?? 'vertical',
      theme: instanceConfig?.Theme ?? 'default',
    });
  // 存放夜间主题切换前的导航主题色
  let tempLayoutThemeColor;
  const dataTheme = ref(instance.layout.darkMode);
  const setLayoutThemeColor = (theme) => {
    console.log('setTheme', instance.layout.theme, theme);
    tempLayoutThemeColor = instance.layout.theme;
    layoutTheme.value.theme = theme;
    toggleTheme({
      scopeName: `layout-theme-${theme}`,
    });
    instance.layout = {
      theme,
      darkMode: dataTheme.value,
      sidebarStatus: instance.layout.sidebarStatus,
    };
  };
  const dataThemeChange = () => {
    if (dataTheme.value) {
      body.setAttribute('data-theme', 'dark');
      setLayoutThemeColor('light');
    } else {
      body.setAttribute('data-theme', '');
      tempLayoutThemeColor
        ? setLayoutThemeColor(tempLayoutThemeColor)
        : setLayoutThemeColor(instance.layout.theme);

      instance.layout = {
        theme: instance.layout.theme,
        darkMode: dataTheme.value,
        sidebarStatus: instance.layout.sidebarStatus,
      };
    }
  };

  // 设置主题色
  let themeColors = ref([
    // 道奇蓝（默认）
    { color: '#1b2a47', themeColor: 'default' },
    // 亮白色
    { color: '#ffffff', themeColor: 'light' },
    // 猩红色
    { color: '#f5222d', themeColor: 'dusk' },
    // 橙红色
    { color: '#fa541c', themeColor: 'volcano' },
    // 金色
    { color: '#fadb14', themeColor: 'yellow' },
    // 绿宝石
    { color: '#13c2c2', themeColor: 'mingQing' },
    // 酸橙绿
    { color: '#52c41a', themeColor: 'auroraGreen' },
    // 深粉色
    { color: '#eb2f96', themeColor: 'pink' },
    // 深紫罗兰色
    { color: '#722ed1', themeColor: 'saucePurple' },
  ]);
  const getThemeColorStyle = computed(() => {
    return (color) => ({ background: color });
  });
  const getThemeColor = computed(() => {
    return (current) => {
      if (current === layoutTheme.value.theme && layoutTheme.value.theme !== 'light') {
        return '#fff';
      } else if (current === layoutTheme.value.theme && layoutTheme.value.theme === 'light') {
        return '#1d2b45';
      } else {
        return 'transparent';
      }
    };
  });
  /* 主题end */
  // console.log('instance', instance);

  // 初始化项目配置
  nextTick(() => {
    console.log('setting init', instance);
    dataThemeChange();
  });
</script>

<style lang="scss" scoped>
  .theme-mode {
    width: 100%;
    height: 50px;
    text-align: center;
    display: block;
    padding-top: 25px;
  }

  .theme-color {
    width: 100%;
    height: 40px;
    margin-top: 20px;
    display: flex;
    justify-content: center;

    li {
      float: left;
      width: 20px;
      height: 20px;
      margin-top: 8px;
      margin-right: 8px;
      font-weight: 700;
      text-align: center;
      border-radius: 2px;
      cursor: pointer;

      &:nth-child(2) {
        border: 1px solid #ddd;
      }
    }
  }

  :deep(.el-divider__text) {
    font-size: 16px;
    font-weight: 700;
  }
</style>
