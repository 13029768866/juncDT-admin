<template>
  <div :class="['app-wrapper', set.classes]">
    <!--  菜单栏  -->
    <Vertical v-show="layout.includes('vertical')" />
    <!--  main容器  -->
    <div :class="['main-container']">
      <div class="fixed-header">
        <layout-header />
      </div>
      <!--  主题内容  -->
      <app-main />
    </div>
    <!-- 系统设置 -->
    <Setting />
  </div>
</template>

<script setup>
  import { useAppStoreHook } from '/@/store/modules/app';

  import Vertical from './components/sidebar/vertical.vue';
  import LayoutHeader from './components/layoutHeader.vue';
  import AppMain from './components/appMain.vue';
  import Setting from './components/setting/index.vue';

  /* 配置选项 */
  const set = reactive({
    sidebar: computed(() => {
      return useAppStoreHook().sidebar;
    }),
    classes: computed(() => {
      return {
        hideSidebar: !set.sidebar.opened,
        openSidebar: set.sidebar.opened,
        withoutAnimation: set.sidebar.withoutAnimation,
      };
    }),
  });

  const instance = getCurrentInstance().appContext.app.config.globalProperties;

  // 清空缓存后从serverConfig.json读取默认配置并赋值到storage中
  const layout = computed(() => {
    // 导航
    if (!instance.$storage.layout) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      instance.$storage.layout = {
        layout: instance.$config?.Layout ?? 'vertical',
        theme: instance.$config?.Theme ?? 'default',
        darkMode: instance.$config?.DarkMode ?? false,
        sidebarStatus: instance.$config?.SidebarStatus ?? true,
        epThemeColor: instance.$config?.EpThemeColor ?? '#409EFF',
      };
    }

    return instance.$storage?.layout.layout;
  });
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
