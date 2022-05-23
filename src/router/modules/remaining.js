import { $t } from '/@/plugins/i18n';
const Layout = () => import('/@/layout/index.vue');

const remainingRouter = [
  {
    path: '/login',
    name: 'login',
    component: () => import('/@/views/sys/login/login.vue'),
    hidden: true,
    meta: {
      title: '登录',
      showLink: false,
    },
  },
  {
    path: '/redirect',
    component: Layout,
    meta: {
      icon: 'setting',
      title: $t('menus.workbench'),
      i18n: true,
      showLink: false,
      rank: 104,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'redirect',
        component: () => import('/@/layout/redirect.vue'),
      },
    ],
  },
];

export default remainingRouter;
