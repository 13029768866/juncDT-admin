// 组件库国际化与本地国际化兼容
import { createI18n } from 'vue-i18n';
import { storageLocal } from '/@/utils/storage';

// element-plus国际化
import enLocale from 'element-plus/lib/locale/lang/en';
import zhLocale from 'element-plus/lib/locale/lang/zh-cn';

// 提取本地配置语言
function siphonI18n(prefix = 'zh-CN') {
  return Object.fromEntries(
    Object.entries(import.meta.globEager('../../locales/*.y(a)?ml')).map(([key, value]) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
      return [matched, value.default];
    })
  )[prefix];
}

export const localesConfigs = {
  zh: {
    ...siphonI18n('zh-CN'),
    ...zhLocale,
  },
  en: {
    ...siphonI18n('en'),
    ...enLocale,
  },
};
console.log('i18n', storageLocal);
export const i18n = createI18n({
  legacy: false,
  fallbackLocale: 'en',
  locale: storageLocal.getItem('responsive-locale')?.locale ?? 'zh',
  messages: localesConfigs,
});

export function useI18n(app) {
  app.use(i18n);
}
