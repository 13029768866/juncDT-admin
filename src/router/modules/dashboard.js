import { $t } from '/@/plugins/i18n';

const Layout = () => import('/@/layout/index.vue');
const dashboardRouter = {
  path: '/',
  name: 'home',
  redirect: '/dashboard',
  component: Layout,
  meta: {
    title: $t('menus.workbench'),
    i18n: true,
    rank: 0,
  },
  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: $t('menus.workbench'),
        i18n: true,
      },
    },
  ],
};

export default dashboardRouter;
