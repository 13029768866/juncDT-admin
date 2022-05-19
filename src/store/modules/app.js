import { store } from '/@/store';
import { defineStore } from 'pinia';
import { getConfig } from '/@/config';
import { storageLocal } from '/@/utils/storage';

export const useAppStore = defineStore({
  id: 'wr-app',
  state: () => ({
    // 侧边栏
    sidebar: {
      opened: storageLocal.getItem('responsive-layout')?.sidebarStatus ?? getConfig().SidebarStatus,
      withoutAnimation: false,
      isClickHamburger: false,
    },
    layout: storageLocal.getItem('responsive-layout')?.layout ?? getConfig().Layout,
  }),
  getters: {
    getSidebarStatus() {
      return this.sidebar.opened;
    },
  },
  actions: {
    TOGGLE_SIDEBAR(opened, resize) {
      const layout = storageLocal.getItem('responsive-layout');
      if (opened && resize) {
        this.sidebar.withoutAnimation = true;
        this.sidebar.opened = true;
        layout.sidebarStatus = true;
      } else if (!opened && resize) {
        this.sidebar.withoutAnimation = true;
        this.sidebar.opened = false;
        layout.sidebarStatus = false;
      } else if (!opened && !resize) {
        this.sidebar.withoutAnimation = false;
        this.sidebar.opened = !this.sidebar.opened;
        this.sidebar.isClickHamburger = !this.sidebar.opened;
        layout.sidebarStatus = this.sidebar.opened;
      }
      storageLocal.setItem('responsive-layout', layout);
    },
    async toggleSideBar(opened, resize) {
      await this.TOGGLE_SIDEBAR(opened, resize);
    },
    setLayout(layout) {
      this.layout = layout;
    },
  },
});

export function useAppStoreHook() {
  return useAppStore(store);
}
