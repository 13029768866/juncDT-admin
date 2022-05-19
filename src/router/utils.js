import { buildHierarchyTree } from '/@/utils/tree';
import { usePermissionStoreHook } from '/@/store/modules/permission';
import { useTimeoutFn } from '@vueuse/core';

/* 初始化路由 */
export function initRouter() {
  return new Promise(() => {
    // 动态路由处理 todo
    usePermissionStoreHook().changeSetting([]);
  });
}

/*
    嵌套路由处理成一维路由
*   parma routesList 传入路由表
*   @return 处理后的一维路由
* */
export function formatFlatteningRoutes(routesList) {
  if (routesList.length === 0) return routesList;
  let hierarchyList = buildHierarchyTree(routesList);
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children, hierarchyList.slice(i + 1));
    }
  }
  return hierarchyList;
}

/*
*   一维数组处理成多级嵌套数组（三级及以上的路由全部拍成二级，keep-alive 只支持到二级缓存）
*   @param routesList 处理后的一维路由菜单数组
    @return 返回将一维数组重新处理成规定路由的格式
* */
export function formatTwoStageRoutes(routesList) {
  if (routesList.length === 0) return routesList;
  const newRoutesList = [];
  routesList.forEach((v) => {
    if (v.path === '/') {
      newRoutesList.push({
        component: v.component,
        name: v.name,
        path: v.path,
        redirect: v.redirect,
        meta: v.meta,
        children: [],
      });
    } else {
      newRoutesList[0].children.push({ ...v });
    }
  });
  return newRoutesList;
}

/* 按照路由中meta的rank等级升序排列 */
export function ascending(arr) {
  arr.forEach((v) => {
    if (v?.meta?.rank === null) v.meta.rank = undefined;
    if (v?.meta?.rank === 0) {
      if (v.name !== 'home' && v.path !== '/') {
        console.log('rank在home页需要设置为0');
      }
    }
  });
  return arr.sort((a, b) => {
    return a?.meta?.rank - b?.meta?.rank;
  });
}

/* 根据meta中showLink筛选 */
export function filterTree(data) {
  const newTree = data.filter((v) => v.meta?.showLink !== false);
  newTree.forEach((v) => v.children && (v.children = filterTree(v.children)));
  return newTree;
}

/* 查找path对应的路由信息 */
export function findRouteByPath(path, routes) {
  let res = routes.find((item) => item.path == path);
  if (res) {
    return res;
  } else {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].children instanceof Array && routes[i].children.length > 0) {
        res = findRouteByPath(path, routes[i].children);
        if (res) {
          return res;
        }
      }
    }
    return null;
  }
}

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
