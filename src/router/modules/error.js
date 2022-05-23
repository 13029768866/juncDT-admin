import { $t } from '/@/plugins/i18n';

const Layout = () => import('/@/layout/index.vue');

const errorRouter = {
  path: '/error',
  component: Layout,
  redirect: '/error/403',
  meta: {
    icon: 'check',
    title: $t('menus.error'),
    i18n: true,
    rank: 9,
  },
  children: [
    {
      path: '/error/401',
      name: '401',
      component: () => import('/@/views/error/405.vue'),
      hidden: true,
      meta: {
        title: 401,
      },
    },
    {
      path: '/error/403',
      name: '403',
      component: () => import('/@/views/error/403.vue'),
      hidden: true,
      meta: {
        title: $t('menus.FourZeroThree'),
        i18n: true,
      },
    },
    {
      path: '/error/404',
      name: '404',
      component: () => import('/@/views/error/404.vue'),
      hidden: true,
      meta: {
        title: $t('menus.FourZeroFour'),
        i18n: true,
      },
    },
  ],
};

export default errorRouter;
