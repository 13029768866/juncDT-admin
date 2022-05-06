// 响应式storage
import Storage from 'responsive-storage';

export const injectResponsiveStorage = (app, config = {}) => {
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
        darkMode: config.DarkMode ?? false, // 夜间模式
      },
    },
  });

  app.use(Storage, configObj);
};
