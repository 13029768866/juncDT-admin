import router from '../index';
import NProgress from '/@/utils/progress';
import { getToken } from '/@/utils/auth';
import { isRelogin } from '/@/utils/request';
import { useUserStoreHook } from '/@/store/modules/user';

/* 路由白名单 */
const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  NProgress.start();

  /* token是否存在 */
  if (getToken()) {
    // 设置页面title todo
    console.log('token', getToken());
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
