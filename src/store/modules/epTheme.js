import { defineStore } from 'pinia';
import { getConfig } from '/@/config';
import { storageLocal } from '/@/utils/storage';
import { store } from '/@/store';

export const useEpThemeStore = defineStore({
  id: 'WR-epTheme',
  state: () => ({
    // 主题色
    epThemeColor:
      storageLocal.getItem('responsive-layout')?.epThemeColor ?? getConfig().EpThemeColor,
    // 主题类型
    epTheme: storageLocal.getItem('responsive-layout')?.theme ?? getConfig().Theme,
  }),
  getters: {
    getEpThemeColor() {
      return this.epThemeColor;
    },
    // 用于mix导航模式下hamburger-svg的fill属性
    fill() {
      if (this.epTheme === 'light') {
        return '#409eff';
      } else if (this.epTheme === 'yellow') {
        return '#d25f00';
      } else {
        return '#fff';
      }
    },
  },
  actions: {
    setStoreEpThemeColor(newColor) {
      const layout = storageLocal.getItem('responsive-layout');
      this.epTheme = layout?.theme;
      this.epThemeColor = newColor;
      layout.epThemeColor = newColor;
      storageLocal.setItem('responsive-layout', layout);
    },
  },
});

export function useEpThemeStoreHook() {
  return useEpThemeStore(store);
}
