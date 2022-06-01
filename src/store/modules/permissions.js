import { defineStore } from 'pinia';
import { store } from '/@/store';
import { constantRoutes } from '/@/router';
import { getRoutes } from '../../api/menu';

const Layout = () => import('/@/layout/index.vue');
const ParentView = () => import('/@/layout/parentView/index.vue');

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('../../views/**/*.vue');
// 路由懒加载
export const loadView = (view) => {
  let res;
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
};
function filterChildren(childrenMap, lastRouter = false) {
  var children = [];
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach((c) => {
          c.path = el.path + '/' + c.path;
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c));
            return;
          }
          children.push(c);
        });
        return;
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path;
    }
    children = children.concat(el);
  });
  return children;
}

// 根据后台路由,转化为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children);
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout;
      } else if (route.component === 'ParentView') {
        route.component = ParentView;
      } else if (route.component === 'InnerLink') {
        // todo
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type);
    } else {
      delete route['children'];
      delete route['redirect'];
    }
    return true;
  });
}

export const usePremissionsStore = defineStore({
  id: 'WR-permissions',
  state: () => ({
    routes: [], //  整个路由
    addRoutes: [], // 后端原始路由
    defaultRoutes: [], // 默认菜单
    topbarRoutes: [], // tag栏菜单
    sidebarRoutes: [], // 侧边栏菜单
  }),
  getters: {
    getTopbarRoutes() {
      return this.topbarRoutes;
    },
  },
  actions: {
    SET_ROUTES(routes) {
      this.addRoutes = routes;
      this.routes = constantRoutes.concat(routes);
    },
    SET_DEFAULT_ROUTES(routes) {
      this.defaultRoutes = constantRoutes.concat(routes);
    },
    SET_TOPBAR_ROUTES(routes) {
      this.topbarRoutes = routes;
    },
    SET_SIDEBAR_ROUTERS(routes) {
      this.sidebarRoutes = routes;
    },
    // 生成路由
    GenerateRoutes() {
      return new Promise((resolve) => {
        getRoutes().then((res) => {
          const sdata = JSON.parse(JSON.stringify(res.data));
          const rdata = JSON.parse(JSON.stringify(res.data));
          const defaultData = JSON.parse(JSON.stringify(res.data));
          // 侧边栏路由
          const sidebarRoutes = filterAsyncRouter(sdata);
          // 重写后的路由
          const rewriteRoutes = filterAsyncRouter(rdata, false, true);

          this.SET_ROUTES(rewriteRoutes);
          this.SET_SIDEBAR_ROUTERS(constantRoutes.concat(sidebarRoutes));
          this.SET_DEFAULT_ROUTES(sidebarRoutes);
          this.SET_TOPBAR_ROUTES(constantRoutes.concat(defaultData));
          resolve(rewriteRoutes);
        });
      });
    },
  },
});

export function usePermissionsStoreHook() {
  return usePremissionsStore(store);
}
