const Layout = () => import('/@/layout/index.vue');
const dashboardRouter = {
  path: '/',
  name: 'home',
  redirect: '/dashboard',
  component: Layout,

  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: { title: '工作台', titleEn: 'Workbench', icon: 'dashboard', affix: true },
    },
  ],
};

export default dashboardRouter;
