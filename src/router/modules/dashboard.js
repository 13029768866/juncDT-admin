const Layout = () => import('/@/layout/index.vue');
const dashboardRouter = {
  path: '/',
  name: 'home',
  redirect: '/dashboard',
  component: Layout,
  meta: {
    title: '首页',
  },
  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: '工作台',
      },
    },
  ],
};

export default dashboardRouter;
