<template>
  <div class="navbar">
    <div class="vertical-header-right">
      <!--  全屏  -->
      <screenfull />
      <!--  国际化  -->
      <el-dropdown trigger="click">
        <globalization />
        <template #dropdown>
          <el-dropdown-menu class="translation">
            <el-dropdown-item @click="translationCh">
              <span v-show="locale === 'zh'" class="check-zh">
                <IconifyIconOffline icon="check" />
              </span>
              简体中文
            </el-dropdown-item>
            <el-dropdown-item @click="translationEn">
              <span v-show="locale === 'en'" class="check-en">
                <IconifyIconOffline icon="check" />
              </span>
              English
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="el-icon-setting">
        <IconifyIconOffline icon="setting" />
      </span>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import screenfull from '../components/screenfull/index.vue';
  import globalization from '/@/assets/svg/globalization.svg?component';

  const instance = getCurrentInstance().appContext.config.globalProperties.$storage;
  console.log('navbar----', instance);
  /* 国际化start */
  const { locale } = useI18n();

  const translationCh = () => {
    instance.locale = { locale: 'zh' };
    locale.value = 'zh';
  };
  const translationEn = () => {
    instance.locale = { locale: 'en' };
    locale.value = 'en';
  };
  /* 国际化end */
</script>

<style lang="scss" scoped>
  .navbar {
    width: 100%;
    height: 48px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

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
        width: 100px;
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
  }

  // 国际化
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
</style>
