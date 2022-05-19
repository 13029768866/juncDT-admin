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
      path: '/error/403',
      name: '403',
      component: () => import('/@/views/error/403.vue'),
      meta: {
        title: $t('menus.FourZeroThree'),
        i18n: true,
      },
    },
    {
      path: '/error/404',
      name: '404',
      component: () => import('/@/views/error/404.vue'),
      meta: {
        title: $t('menus.FourZeroFour'),
        i18n: true,
      },
    },
    {
      path: '/error/405',
      name: '405',
      component: () => import('/@/views/error/405.vue'),
      meta: {
        title: 405,
      },
    },
    {
      path: '/error/406',
      name: '406',
      component: () => import('/@/views/error/406.vue'),
      meta: {
        title: 406,
      },
    },
    {
      path: '/error/407',
      name: '407',
      component: () => import('/@/views/error/407.vue'),
      meta: {
        title: 407,
      },
    },
    {
      path: '/error/408',
      name: '408',
      component: () => import('/@/views/error/408.vue'),
      meta: {
        title: 408,
      },
    },
    {
      path: '/error/409',
      name: '409',
      component: () => import('/@/views/error/409.vue'),
      meta: {
        title: 40999999999999,
      },
    },
    {
      path: '/error/410',
      name: '410',
      component: () => import('/@/views/error/410.vue'),
      meta: {
        title: 4100000000000000,
      },
    },
    {
      path: '/error/411',
      name: '411',
      component: () => import('/@/views/error/411.vue'),
      meta: {
        title: 41111111111,
      },
    },
    {
      path: '/error/412',
      name: '412',
      component: () => import('/@/views/error/412.vue'),
      meta: {
        title: 412222222222,
      },
    },
    {
      path: '/error/413',
      name: '413',
      component: () => import('/@/views/error/413.vue'),
      meta: {
        title: 4133333333,
      },
    },
    {
      path: '/error/414',
      name: '414',
      component: () => import('/@/views/error/414.vue'),
      meta: {
        title: 4144444444,
      },
    },
  ],
};

export default errorRouter;
