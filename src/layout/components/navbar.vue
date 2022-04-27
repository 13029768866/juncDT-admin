<template>
  <div class="navbar">
    <div class="vertical-header-right">
      <!--  全屏  -->
      <screenfull />
    </div>
  </div>
</template>

<script setup>
  import screenfull from '../components/screenfull/index.vue';
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

      .screen-full {
        cursor: pointer;

        &:hover {
          background: #f6f6f6;
        }
      }

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
</style>
