// 响应式storage
import Storage from 'responsive-storage';

export const injectResponsiveStorage = (app, config = {}) => {
  console.log('responsive layout', Storage.getData(undefined, 'layout'));
  const configObj = Object.assign({
    // 国际化
    locale: {
      type: Object,
      default: Storage.getData(undefined, 'locale') ?? {
        locale: config.Locale ?? 'zh',
      },
    },
    // layout模式以及主题
    layout: {
      type: Object,
      default: Storage.getData(undefined, 'layout') ?? {
        theme: config.Theme ?? 'default',
        darkMode: config.DarkMode ?? false, // 夜间模式
        sidebarStatus: config.SidebarStatus ?? true,
        epThemeColor: config.EpThemeColor ?? '#409EFF',
      },
    },
    // 页面配置项
    configure: {
      type: Object,
      default: Storage.getData(undefined, 'configure') ?? {
        grey: config.Grey ?? false,
        showLogo: config.ShowLogo ?? true,
        hideTabs: config.HideTabs ?? false,
      },
    },
  });

  app.use(Storage, configObj);
};
