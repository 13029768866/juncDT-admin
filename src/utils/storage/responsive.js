// 响应式storage
import Storage from 'responsive-storage';

export const injectResponsiveStorage = (app, config = {}) => {
  const configObj = Object.assign(
    {
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
          layout: config.Layout ?? 'vertical',
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
          multiTagsCache: config.MultiTagsCache ?? false,
        },
      },
    },
    config.MultiTagsCache
      ? {
          // 默认显示首页tag
          tags: {
            type: Array,
            default: Storage.getData(undefined, 'tags') ?? [
              {
                path: '/dashboard',
                parentPath: '/',
                meta: {
                  title: 'menus.workbench',
                  i18n: true,
                  icon: 'home-filled',
                },
              },
            ],
          },
        }
      : {}
  );
  app.use(Storage, configObj);
};
