<template>
  <div :class="['sidebar-container']">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="route.path"
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
  import SidebarItem from './sidebarItem.vue';

  import { useNav } from '../../hooks/useNav';
  import { usePermissionStoreHook } from '/@/store/modules/permission';

  window.document.body.setAttribute('layout', 'vertical');

  const route = useRoute();
  const routers = useRouter().options.routes;
  /* menu操作 start */
  const { menuSelect } = useNav();

  // 菜单数据
  const menuData = computed(() => {
    return usePermissionStoreHook().wholeMenus;
  });
  console.log('菜单数据', menuData.value);
  /* menu操作 end */
</script>

<style lang="scss" scoped></style>
