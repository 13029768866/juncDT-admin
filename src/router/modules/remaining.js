const remainingRouter = [
  {
    path: '/login',
    name: 'login',
    component: () => import('/@/views/sys/login/login.vue'),
    meta: {
      title: '登录',
    },
  },
];

export default remainingRouter;
