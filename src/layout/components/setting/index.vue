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

    <el-divider>导航栏模式</el-divider>
    <ul class="wr-theme">
      <el-tooltip class="item" content="左侧模式" placement="bottom">
        <li
          :class="layoutTheme.layout === 'vertical' ? $style.isSelect : ''"
          ref="verticalRef"
          @click="setLayoutModel('vertical')"
        >
          <div />
          <div />
        </li>
      </el-tooltip>

      <el-tooltip class="item" content="顶部模式" placement="bottom">
        <li
          :class="layoutTheme.layout === 'horizontal' ? $style.isSelect : ''"
          ref="horizontalRef"
          @click="setLayoutModel('horizontal')"
        >
          <div />
          <div />
        </li>
      </el-tooltip>
    </ul>

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

    <!-- 界面显示 -->
    <el-divider>界面显示</el-divider>
    <ul class="setting">
      <li v-show="!dataTheme">
        <span>灰色模式</span>
        <el-switch
          v-model="settings.greyVal"
          inline-prompt
          inactive-color="#a6a6a6"
          active-text="开"
          inactive-text="关"
          @change="greyChange"
        />
      </li>
      <li>
        <span>侧边栏Logo</span>
        <el-switch
          v-model="logoVal"
          inline-prompt
          :active-value="true"
          :inactive-value="false"
          inactive-color="#a6a6a6"
          active-text="开"
          inactive-text="关"
          @change="logoChange"
        />
      </li>
      <li>
        <span>隐藏标签页</span>
        <el-switch
          v-model="settings.tabsVal"
          inline-prompt
          inactive-color="#a6a6a6"
          active-text="开"
          inactive-text="关"
          @change="tagsChange"
        />
      </li>
      <li>
        <span>标签页持久化</span>
        <el-switch
          v-model="settings.multiTagsCache"
          inline-prompt
          inactive-color="#a6a6a6"
          active-text="开"
          inactive-text="关"
          @change="multiTagsCacheChange"
        />
      </li>
    </ul>
  </panel>
</template>

<script setup>
  import { find } from 'lodash-unified';

  import { storageLocal } from '/@/utils/storage';
  import { toggleTheme } from '@pureadmin/theme/dist/browser-utils';
  import { events } from '/@/utils/mitt';
  import { getConfig } from '/@/config';
  import { createNewStyle, writeNewStyle, shadeBgColor } from '../../theme/element-plus';

  import { useEpThemeStoreHook } from '/@/store/modules/epTheme';
  import { useMultiTagsStoreHook } from '/@/store/modules/multiTags';
  import { useAppStoreHook } from '/@/store/modules/app';

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

  // body添加layout属性，作用于src/style/sidebar.scss
  if (unref(layoutTheme)) {
    let { layout } = unref(layoutTheme);
    let { theme } = unref(layoutTheme);
    toggleTheme({
      scopeName: `layout-theme-${theme}`,
    });
    setLayoutModel(layout);
  }
  // 存放夜间主题切换前的导航主题色
  let tempLayoutThemeColor;
  const dataTheme = ref(instance.layout.darkMode);
  const setLayoutThemeColor = (theme) => {
    tempLayoutThemeColor = instance.layout.theme;
    layoutTheme.value.theme = theme;
    toggleTheme({
      scopeName: `layout-theme-${theme}`,
    });
    instance.layout = {
      layout: useAppStoreHook().layout,
      theme,
      darkMode: dataTheme.value,
      sidebarStatus: instance.layout.sidebarStatus,
    };

    if (theme === 'default' || theme === 'light') {
      setEpThemeColor(getConfig().EpThemeColor);
    } else {
      const colors = find(themeColors.value, { themeColor: theme });
      setEpThemeColor(colors.color);
    }
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
        layout: useAppStoreHook().layout,
        theme: instance.layout.theme,
        darkMode: dataTheme.value,
        sidebarStatus: instance.layout.sidebarStatus,
        epThemeColor: instance.layout.epThemeColor,
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
  // 设置element-plus主题色
  const setEpThemeColor = (color) => {
    writeNewStyle(createNewStyle(color));
    useEpThemeStoreHook().setStoreEpThemeColor(color);
    body.style.setProperty('--el-color-primary-active', shadeBgColor(color));
  };

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

  // 设置导航模式
  function setLayoutModel(layout) {
    layoutTheme.value.layout = layout;
    window.document.body.setAttribute('layout', layout);
    instance.layout = {
      layout,
      theme: layoutTheme.value.theme,
      darkMode: instance.layout.darkMode,
      sidebarStatus: instance.layout.sidebarStatus,
      epThemeColor: instance.layout.epThemeColor,
    };
    useAppStoreHook().setLayout(layout);
  }
  /* 主题end */

  /* layout start */
  const settings = reactive({
    greyVal: instance.configure.grey,
    tabsVal: instance.configure.hideTabs,
    showLogo: instance.configure.showLogo,
    multiTagsCache: instance.configure.multiTagsCache,
  });
  const logoVal = ref(instance.configure?.showLogo ?? true);

  function storageConfigureChange(key, val) {
    const storageConfigure = instance.configure;
    storageConfigure[key] = val;
    instance.configure = storageConfigure;
  }
  function toggleClass(flag, clsName, target) {
    const targetEl = target || document.body;
    let { className } = targetEl;
    className = className.replace(clsName, '').trim();
    targetEl.className = flag ? `${className} ${clsName} ` : className;
  }

  // 灰色模式设置
  const greyChange = (value) => {
    toggleClass(settings.greyVal, 'html-grey', document.querySelector('html'));
    storageConfigureChange('grey', value);
  };

  // logo切换
  function logoChange() {
    unref(logoVal)
      ? storageConfigureChange('showLogo', true)
      : storageConfigureChange('showLogo', false);
    events.emit('logoChange', unref(logoVal));
  }

  // tag栏切换
  const tagsChange = () => {
    let showVal = settings.tabsVal;
    storageConfigureChange('hideTabs', showVal);
    events.emit('tagViewsChange', showVal);
  };

  // 标签缓存
  const multiTagsCacheChange = () => {
    let { multiTagsCache } = settings;
    storageConfigureChange('multiTagsCache', multiTagsCache);
    useMultiTagsStoreHook().multiTagsCacheChange(multiTagsCache);
  };
  /* layout end */
  // 初始化项目配置
  nextTick(() => {
    dataThemeChange();
  });

  const verticalRef = templateRef('verticalRef', null);
  const horizontalRef = templateRef('horizontalRef', null);
  const { isSelect } = useCssModule();

  watch(instance, ({ layout }) => {
    switch (layout['layout']) {
      case 'vertical':
        toggleClass(true, isSelect, unref(verticalRef));
        break;
      case 'horizontal':
        toggleClass(true, isSelect, unref(horizontalRef));
        break;
    }
  });
</script>

<style scoped module>
  .isSelect {
    border: 2px solid var(--el-color-primary);
  }
</style>
<style lang="scss" scoped>
  .wr-theme {
    margin-top: 25px;
    width: 100%;
    height: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    li {
      width: 18%;
      height: 45px;
      background: #f0f2f5;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      border-radius: 4px;
      box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

      &:nth-child(1) {
        div {
          &:nth-child(1) {
            width: 30%;
            height: 100%;
            background: #1b2a47;
          }

          &:nth-child(2) {
            width: 70%;
            height: 30%;
            top: 0;
            right: 0;
            background: #fff;
            box-shadow: 0 0 1px #888;
            position: absolute;
          }
        }
      }

      &:nth-child(2) {
        div {
          &:nth-child(1) {
            width: 100%;
            height: 30%;
            background: #1b2a47;
            box-shadow: 0 0 1px #888;
          }
        }
      }

      &:nth-child(3) {
        div {
          &:nth-child(1) {
            width: 100%;
            height: 30%;
            background: #1b2a47;
            box-shadow: 0 0 1px #888;
          }

          &:nth-child(2) {
            width: 30%;
            height: 70%;
            bottom: 0;
            left: 0;
            background: #fff;
            box-shadow: 0 0 1px #888;
            position: absolute;
          }
        }
      }
    }
  }

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

  .setting {
    width: 100%;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 25px;
    }
  }
</style>
