// 响应式storage
import Storage from 'responsive-storage';

export const injectResponsiveStorage = (app, config = {}) => {
  const configObj = Object.assign({
    locale: {
      type: Object,
      default: Storage.getData(undefined, 'locale') ?? {
        locale: config.Locale ?? 'zh',
      },
    },
  });

  app.use(Storage, configObj);
};
