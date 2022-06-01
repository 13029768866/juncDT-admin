const Layout = () => import('/@/layout/index.vue');

const errorRouter = {
  path: '/error',
  component: Layout,
  redirect: '/error/403',
  hidden: true,
  meta: {
    title: '错误页面',
  },
  children: [
    {
      path: '403',
      name: '403',
      component: () => import('/@/views/error/403.vue'),
      meta: {
        title: 403,
      },
    },
    {
      path: '404',
      name: '404',
      component: () => import('/@/views/error/404.vue'),
      meta: {
        title: 404,
      },
    },
  ],
};

export default errorRouter;
