import { defineStore } from 'pinia';
import { store } from '/@/store';
import { isUrl } from '/@/utils/is';
import { isEqual } from 'lodash-unified';
import { storageLocal } from '/@/utils/storage';

export const useMultiTagsStore = defineStore({
  id: 'WR-multiTags',
  state: () => ({
    // 标签页信息（路由信息）
    multiTags: storageLocal.getItem('responsive-configure').multiTagsCache
      ? storageLocal.getItem('responsive-tags')
      : [
          {
            path: '/dashboard',
            parentPath: '/',
            meta: {
              title: 'menus.workbench',
              icon: 'home-filled',
              i18n: true,
            },
          },
        ],
    // 带缓存的标签页信息
    multiTagsCache: storageLocal.getItem('responsive-configure').multiTagsCache,
  }),
  getters: {
    getMultiTagsCache() {
      return this.multiTagsCache;
    },
  },
  actions: {
    /* 开启标签缓存 */
    multiTagsCacheChange(multiTagsCache) {
      this.multiTagsCache = multiTagsCache;
      if (multiTagsCache) {
        storageLocal.setItem('responsive-tags', this.multiTags);
      } else {
        storageLocal.removeItem('responsive-tags');
      }
    },

    /* 标签缓存 */
    tagsCache(multiTags) {
      this.getMultiTagsCache && storageLocal.setItem('responsive-tags', multiTags);
    },
    /* 标签操作 */
    handleTags(mode, value, position) {
      switch (mode) {
        case 'equal':
          this.multiTags = value;
          this.tagsCache(this.multiTags);
          break;
        case 'push':
          {
            const tagVal = value;
            if (isUrl(tagVal?.name)) return;
            const tagPath = tagVal?.path;
            // 判断tag是否已存在
            const tagHasExits = this.multiTags.some((tag) => {
              return tag.path === tagPath;
            });

            // 判断tag中的query键值是否相等
            const tagQueryHasExits = this.multiTags.some((tag) => {
              return isEqual(tag.query, tagVal?.query);
            });

            if (tagHasExits && tagQueryHasExits) return;

            const dynamicLevel = tagVal?.meta?.dynamicLevel ?? -1;
            if (dynamicLevel > 0) {
              // dynamicLevel动态路由可打开的数量
              // 获取到已经打开的动态路由数, 判断是否大于dynamicLevel
              if (this.multiTags.filter((e) => e?.path === tagPath).length >= dynamicLevel) {
                // 关闭第一个
                const index = this.multiTags.findIndex((item) => item?.path === tagPath);
                index !== -1 && this.multiTags.splice(index, 1);
              }
            }
            this.multiTags.push(value);
            this.tagsCache(this.multiTags);
          }
          break;
        case 'splice':
          if (!position) {
            const index = this.multiTags.findIndex((v) => v.path === value);
            if (index === -1) return;
            this.multiTags.splice(index, 1);
          } else {
            this.multiTags.splice(position?.startIndex, position?.length);
          }
          this.tagsCache(this.multiTags);
          return this.multiTags;
        case 'slice':
          return this.multiTags.slice(-1);
      }
    },
  },
});

export function useMultiTagsStoreHook() {
  return useMultiTagsStore(store);
}
