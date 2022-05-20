<template>
  <div class="horizontal-header">
    <div class="horizontal-header-left" @click="backHome">
      <h4>{{ title }}</h4>
    </div>
    <!-- 菜单 -->
    <el-menu
      ref="menu"
      class="horizontal-header-menu"
      mode="horizontal"
      :default-active="route.path"
      router
      @select="(indexPath) => menuSelect(indexPath, routers)"
    >
      <sidebar-item
        v-for="route in usePermissionStoreHook().wholeMenus"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
    <!-- 右侧操作 -->
    <div class="horizontal-header-right">
      <!-- 全屏 -->
      <Screenfull id="header-screenfull" />
      <!--  国际化  -->
      <el-dropdown id="header-translation" trigger="click">
        <globalization />
        <template #dropdown>
          <el-dropdown-menu class="translation">
            <el-dropdown-item @click="toggleLocales">
              <span v-show="locale === 'zh'" class="check-zh">
                <IconifyIconOffline icon="check" />
              </span>
              简体中文
            </el-dropdown-item>
            <el-dropdown-item @click="toggleLocales">
              <span v-show="locale === 'en'" class="check-en">
                <IconifyIconOffline icon="check" />
              </span>
              English
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!--  退出登录  -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="avatars" />
          <p>我二弟天下无敌</p>
        </span>
      </el-dropdown>
      <!--  设置  -->
      <span class="el-icon-setting" :title="t('buttons.systemSettings')" @click="openPanel">
        <IconifyIconOffline icon="setting" />
      </span>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';

  import { useNav } from '../../hooks/useNav';
  import { usePermissionStoreHook } from '/@/store/modules/permission';

  import SidebarItem from './sidebarItem.vue';
  import Screenfull from '../screenfull/index.vue';

  import avatars from '/@/assets/avatars.webp';
  import globalization from '/@/assets/svg/globalization.svg?component';

  const route = useRoute();
  const routers = useRouter().options.routes;
  // const menuRef = templateRef('menu', null);
  const instance = getCurrentInstance().appContext.config.globalProperties.$storage;
  const title = getCurrentInstance().appContext.config.globalProperties.$config?.Title;
  const { backHome, menuSelect, openPanel } = useNav();

  /* 国际化start */
  const { t, availableLocales, locale } = useI18n();

  const toggleLocales = () => {
    const locales = availableLocales;
    locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
    instance.locale = { locale: locale.value };
  };
  /* 国际化end */
</script>

<style lang="scss" scoped>
  .translation {
    ::v-deep(.el-dropdown-menu__item) {
      padding: 5px 40px;
    }

    .check-zh {
      position: absolute;
      left: 20px;
    }

    .check-en {
      position: absolute;
      left: 20px;
    }
  }

  .logout {
    max-width: 120px;

    ::v-deep(.el-dropdown-menu__item) {
      min-width: 100%;
      display: inline-flex;
      flex-wrap: wrap;
    }
  }
</style>
