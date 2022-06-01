const Layout = () => import('/@/layout/index.vue');

const remainingRouter = [
  {
    path: '/login',
    name: 'login',
    component: () => import('/@/views/system/login/login.vue'),
    hidden: true,
    meta: {
      title: '登录页',
      showLink: false,
    },
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'redirect',
        component: () => import('/@/layout/redirect.vue'),
      },
    ],
  },
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('/@/views/system/user/authRole.vue'),
        name: 'AuthRole',
        meta: { title: '分配角色', titleEn: 'Assign Roles', activeMenu: '/system/user' },
      },
    ],
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('/@/views/system/role/authUser.vue'),
        name: 'AuthUser',
        meta: { title: '分配用户', titleEn: 'Assign User', activeMenu: '/system/role' },
      },
    ],
  },
];

export default remainingRouter;
