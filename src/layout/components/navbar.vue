<template>
  <div class="navbar">
    <Hamburger class="hamburger-container" :is-active="!isCollapse" @toggleClick="toggleSideBar" />
    <!-- 面包屑 -->
    <!--    <Breadcrumb class="breadcrumb-container"></Breadcrumb>-->
    <div class="vertical-header-right">
      <!--  全屏  -->
      <screenfull />
      <!--  国际化  -->
      <el-dropdown trigger="click">
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
        <template #dropdown>
          <el-dropdown-menu class="logout">
            <el-dropdown-item @click="logout">
              <IconifyIconOffline icon="logout-circle-r-line" style="margin: 5px" />{{
                t('buttons.LoginOut')
              }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!--  设置  -->
      <span class="el-icon-setting" :title="t('buttons.systemSettings')" @click="openPanel">
        <IconifyIconOffline icon="setting" />
      </span>
    </div>
  </div>
</template>

<script setup>
  import { ElMessageBox } from 'element-plus';
  import { useUserStoreHook } from '/@/store/modules/user';

  import { useI18n } from 'vue-i18n';
  import { useNav } from '../hooks/useNav';

  import Screenfull from '../components/screenfull/index.vue';
  import Hamburger from './sidebar/hamburger.vue';

  import globalization from '/@/assets/svg/globalization.svg?component';
  import avatars from '/@/assets/avatars.webp';

  const instance = getCurrentInstance().appContext.config.globalProperties.$storage;
  const { isCollapse, openPanel, toggleSideBar } = useNav();

  /* 国际化start */
  const { t, availableLocales, locale } = useI18n();
  const toggleLocales = () => {
    const locales = availableLocales;
    locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
    instance.locale = { locale: locale.value };
  };
  /* 国际化end */

  const logout = () => {
    ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        useUserStoreHook()
          .LogOut()
          .then(() => {
            location.href = '/index';
          });
      })
      .catch(() => {});
  };
</script>

<style lang="scss" scoped>
  .navbar {
    width: 100%;
    height: 48px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
      line-height: 48px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;
    }

    .vertical-header-right {
      display: flex;
      min-width: 280px;
      height: 48px;
      align-items: center;
      color: #000000d9;
      justify-content: flex-end;

      :deep(.dropdown-badge) {
        &:hover {
          background: #f6f6f6;
        }
      }

      // 全屏
      .screen-full {
        cursor: pointer;

        &:hover {
          background: #f6f6f6;
        }
      }
      // 国际化
      .globalization {
        height: 48px;
        width: 40px;
        padding: 11px;
        cursor: pointer;

        &:hover {
          background: #f6f6f6;
        }
      }

      .el-dropdown-link {
        min-width: 100px;
        height: 48px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;
        color: #000000d9;

        &:hover {
          background: #f6f6f6;
        }

        p {
          font-size: 14px;
          margin-left: 5px;
        }

        img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
        }
      }

      .el-icon-setting {
        height: 48px;
        width: 38px;
        padding: 12px;
        display: flex;
        cursor: pointer;
        align-items: center;

        &:hover {
          background: #f6f6f6;
        }
      }
    }

    .breadcrumb-container {
      float: left;
    }
  }

  // 国际化
  .translation {
    ::v-deep(.el-dropdown-menu__item) {
      padding: 5px 40px;
    }

    .check-zh,
    .check-en {
      position: absolute;
      left: 20px;
    }
  }
</style>
