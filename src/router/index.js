import { createRouter, createWebHashHistory } from 'vue-router';

/* 路由模块 */
import dashboardRouter from './modules/dashboard';
import remainingRouter from './modules/remaining';

/* 初始路由(未做任何处理) */
const routes = [dashboardRouter, ...remainingRouter];
console.log(routes);
const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/* 路由守卫 */

export default router;
