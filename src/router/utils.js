import { usePermissionStoreHook } from '/@/store/modules/permission';
import { useTimeoutFn } from '@vueuse/core';

/* 处理缓存路由（添加、删除、刷新） */
export function handleAliveRoute(matched, mode) {
  switch (mode) {
    case 'add':
      matched.forEach((v) => {
        usePermissionStoreHook().cacheOperate({ mode: 'add', name: v.name });
      });
      break;
    case 'delete':
      usePermissionStoreHook().cacheOperate({
        mode: 'delete',
        name: matched[matched.length - 1].name,
      });
      break;
    default:
      usePermissionStoreHook().cacheOperate({
        mode: 'delete',
        name: matched[matched.length - 1].name,
      });
      useTimeoutFn(() => {
        matched.forEach((v) => {
          usePermissionStoreHook().cacheOperate({ mode: 'add', name: v.name });
        });
      }, 100);
  }
}

/* 批量删除缓存路由(keepalive) */
export function delAliveRoutes(delAliveRouteList) {
  delAliveRouteList.forEach((route) => {
    usePermissionStoreHook().cacheOperate({
      mode: 'delete',
      name: route?.name,
    });
  });
}
