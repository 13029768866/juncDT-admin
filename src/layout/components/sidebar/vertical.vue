<template>
  <div :class="['sidebar-container']">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="route.path"
        :collapse="isCollapse"
        unique-opened
        :collapse-transition="false"
        router
        class="outer-most"
        @select="(indexPath) => menuSelect(indexPath, routers)"
      >
        <sidebar-item
          v-for="routes in menuData"
          :key="routes.path"
          :item="routes"
          :base-path="routes.path"
          class="outer-most"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
  import { usePermissionStoreHook } from '/@/store/modules/permission';
  import { storageLocal } from '/@/utils/storage';
  import { events } from '/@/utils/mitt';

  import { useNav } from '../../hooks/useNav';

  import SidebarItem from './sidebarItem.vue';
  import Logo from './logo.vue';

  window.document.body.setAttribute('layout', 'vertical');

  const route = useRoute();
  const routers = useRouter().options.routes;
  /* menu操作 start */
  const { isCollapse, menuSelect } = useNav();

  // 菜单数据
  const menuData = computed(() => {
    return usePermissionStoreHook().wholeMenus;
  });
  const showLogo = ref(storageLocal.getItem('responsive-configure')?.showLogo ?? true);
  /* menu操作 end */

  onBeforeMount(() => {
    events.on('logoChange', (key) => {
      showLogo.value = key;
    });
  });
</script>

<style lang="scss" scoped></style>
