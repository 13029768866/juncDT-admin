import router from '../index';
import NProgress from '/@/utils/progress';
import { getToken } from '/@/utils/auth';
import { isRelogin } from '/@/utils/request';
import { ElMessage } from 'element-plus';

import { useUserStoreHook } from '/@/store/modules/user';
import { usePermissionsStoreHook } from '/@/store/modules/permissions';

/* 路由白名单 */
const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  NProgress.start();

  /* token是否存在 */
  if (getToken()) {
    // 设置页面title todo
    // 去向登录页
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      // 其他页面
      if (useUserStoreHook().getRoles.length === 0) {
        isRelogin.show = true;
        // 判断当前用户是否已经请求userinfo信息
        useUserStoreHook()
          .GetUserInfo()
          .then(() => {
            isRelogin.show = false;
            // 请求动态路由
            usePermissionsStoreHook()
              .GenerateRoutes()
              .then((accessRoutes) => {
                // 根据roles权限生成可访问的路由表
                accessRoutes.forEach((route) => {
                  router.addRoute(route);
                });

                router.addRoute({
                  path: '/:pathMatch(.*)',
                  redirect: '/error/404',
                });
                next({ ...to, replace: true }); // hack方法,确保路由添加完成
              });
          })
          .catch((err) => {
            // 退出登录
            useUserStoreHook()
              .LogOut()
              .then(() => {
                ElMessage.error(err);
                next({ path: '/' });
              });
          });
      } else {
        next();
      }
    }
  } else {
    // 没有token,检查白名单
    if (whiteList.includes(to.path)) {
      // 白名单内直接跳转
      next();
    } else {
      // 否则跳转登录页
      next(`/login?redirect=${to.fullPath}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
