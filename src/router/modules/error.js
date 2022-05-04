const Layout = () => import('/@/layout/index.vue');

const errorRouter = {
  path: '/error',
  component: Layout,
  redirect: '/error/403',
  children: [
    {
      path: '/error/403',
      name: '403',
      component: () => import('/@/views/error/403.vue'),
    },
    {
      path: '/error/404',
      name: '404',
      component: () => import('/@/views/error/404.vue'),
    },
  ],
};

export default errorRouter;
