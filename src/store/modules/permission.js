import { defineStore } from 'pinia';
import { store } from '/@/store';
import { constantMenus } from '/@/router';
import { cloneDeep } from 'lodash-unified';
import { ascending, filterTree } from '/@/router/utils';

export const usePermissionStore = defineStore({
  id: 'WR-permission',
  state: () => ({
    // 静态路由菜单
    constantMenus,
    // 全部路由的菜单（静态、动态）
    wholeMenus: [],
    // 深拷贝一个菜单树，与导航菜单不突出
    menusTree: [],
    buttonAuth: [],
    // 缓存页面keepAlive
    cachePageList: [],
  }),
  actions: {
    // 获取异步路由菜单
    asyncActionRoutes(routes) {
      if (this.wholeMenus.length > 0) return;
      const wholeMenus = filterTree(ascending(this.constantMenus.concat(routes)));
      this.wholeMenus = wholeMenus;
      this.menusTree = cloneDeep(wholeMenus);

      const getButtonAuth = (arrRoutes) => {
        if (!arrRoutes || !arrRoutes.length) return;
        arrRoutes.forEach((v) => {
          if (v.meta && v.meta.authority) {
            this.buttonAuth.push(...v.meta.authority);
          }
          if (v.children) {
            getButtonAuth(v.children);
          }
        });
      };

      getButtonAuth(this.wholeMenus);
    },
    async changeSetting(routes) {
      await this.asyncActionRoutes(routes);
    },
    // 缓存操作(增,删)
    cacheOperate({ mode, name }) {
      switch (mode) {
        case 'add':
          this.cachePageList.push(name);
          this.cachePageList = [...new Set(this.cachePageList)];
          break;
        case 'delete':
          // eslint-disable-next-line no-case-declarations
          const delIndex = this.cachePageList.findIndex((v) => v === name);
          delIndex !== -1 && this.cachePageList.splice(delIndex, 1);
          break;
      }
    },
    // 清空缓存
    clearAllCachePage() {
      this.cachePageList = [];
    },
  },
});

export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
