import { createRouter, createWebHashHistory } from 'vue-router';
import { buildHierarchyTree } from '/@/utils/tree';
import { ascending, formatFlatteningRoutes, formatTwoStageRoutes } from './utils';

/*
  路由可配置项

  // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
  hidden: Boolean,

  // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式
  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
  alwaysShow: Boolean

  // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
  redirect: noRedirect

  // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
  name:'router-name'

  // 访问路由的默认传递参数
  query: '{"id": 1, "name": "ry"}'

  // 访问路由的角色权限
  roles: ['admin', 'common']

  // 访问路由的菜单权限
  permissions: ['a:a:a', 'b:b:b']

  meta: {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }

*/

/* 路由模块 */
import dashboardRouter from './modules/dashboard';
import errorRouter from './modules/error';
import remainingRouter from './modules/remaining';

/* 初始路由(未做任何处理) */
const routes = [dashboardRouter, errorRouter, ...remainingRouter];

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
  routes: routes,
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
