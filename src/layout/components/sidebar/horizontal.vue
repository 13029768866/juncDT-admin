<template>
  <div class="horizontal-header"> 顶部导航 </div>
</template>

<script setup></script>

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
