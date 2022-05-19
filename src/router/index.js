import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from '/@/utils/progress';
import { buildHierarchyTree } from '/@/utils/tree';
import { initRouter, ascending, formatFlatteningRoutes, formatTwoStageRoutes } from './utils';
import { usePermissionStoreHook } from '/@/store/modules/permission';

/* 路由模块 */
import dashboardRouter from './modules/dashboard';
import errorRouter from './modules/error';
import remainingRouter from './modules/remaining';

/* 初始路由(未做任何处理) */
const routes = [dashboardRouter, errorRouter];

/* 扁平化的静态路由（全部拍成二级） */
const createConstantRoutes = (routes) => {
  // rank排序
  const rankOrder = ascending(routes);
  // 创建层级关系
  const hierarchyTree = buildHierarchyTree(rankOrder);
  // 处理为一维路由
  const oneDimensional = formatFlatteningRoutes(hierarchyTree);
  // 变成常规二级路由
  return formatTwoStageRoutes(oneDimensional);
};
export const constantRoutes = createConstantRoutes(routes);

/* 用于渲染菜单，保持原始层级 */
export const constantMenus = ascending(routes).concat(...remainingRouter);

/* 不参与菜单的路由路径表 */
export const remainingPaths = Object.keys(remainingRouter).map((v) => {
  return remainingRouter[v].path;
});

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes.concat(...remainingRouter),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/* 路由守卫 */
router.beforeEach(() => {
  // if (to.meta?.keepAlive) {
  //   const newMatched = to.matched;
  //   handleAliveRoute(newMatched, 'add');
  //   // 页面整体刷新和点击标签页刷新
  //   if (_from.name === undefined || _from.name === 'redirect') {
  //     handleAliveRoute(newMatched);
  //   }
  // }
  NProgress.start();
  /* 登录鉴权 todo */
  /* 外链校验 todo */
  if (usePermissionStoreHook().wholeMenus.length === 0) {
    initRouter();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
