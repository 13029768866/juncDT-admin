<template>
  <div class="sidebar-logo-container" :class="{ collapse: props.collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="props.collapse"
        key="props.collapse"
        :title="title"
        class="sidebar-logo-link"
        to="/"
      >
        <span class="svg-container">图标</span>
        <span class="sidebar-title">{{ title }}</span>
      </router-link>
      <router-link v-else key="expand" :title="title" class="sidebar-logo-link" to="/">
        <span class="svg-container">图标</span>
        <span class="sidebar-title">{{ title }}</span>
      </router-link>
    </transition>
  </div>
</template>

<script setup>
  const props = defineProps({
    collapse: Boolean,
  });

  const title = getCurrentInstance().appContext.config.globalProperties.$config?.Title;
</script>

<style lang="scss" scoped>
  .svg-container {
    width: 35px;
    height: 35px;
    border: 1px solid #000;
    font-size: 16px;
  }

  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 48px;
    text-align: center;
    overflow: hidden;

    .sidebar-logo-link {
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-top: 5px;

      .sidebar-title {
        color: #4091f7;
        font-weight: 600;
        font-size: 20px;
        margin-top: 10px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      }
    }

    .collapse {
      .sidebar-logo {
        margin-right: 0;
      }
    }
  }
</style>
