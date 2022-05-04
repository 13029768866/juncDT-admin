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

/* 国际化转换工具start */
export const $t = (key) => key;

/**
 * 国际化转换工具函数
 * @param message message
 * @param isI18n  如果true,获取对应的消息,否则返回本身
 * @returns message
 */
export function transformI18n(message, isI18n) {
  if (!message) {
    return '';
  }

  // 处理存储动态路由的title,格式 {zh:"",en:""}
  if (typeof message === 'object') {
    const { locale } = i18n.global;
    return message[locale?.value];
  }

  if (isI18n) {
    return i18n.global.t.call(i18n.global.locale, message);
  } else {
    return message;
  }
}
/* 国际化转换工具end */

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
export const i18n = createI18n({
  legacy: false,
  fallbackLocale: 'en',
  locale: storageLocal.getItem('responsive-locale')?.locale ?? 'zh',
  messages: localesConfigs,
});
export function useI18n(app) {
  app.use(i18n);
}
