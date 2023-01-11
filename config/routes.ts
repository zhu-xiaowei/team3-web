export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'upload',
    access: 'canAdmin',
    component: './video/upload',
  },
  {
    path: '/admin/video/list',
    name: 'admin',
    icon: 'table',
    access: 'canAdmin',
    component: './video/list',
  },
  {
    name: 'list.table-list',
    icon: 'User',
    path: '/admin/user/list',
    access: 'canAdmin',
    component: './user/list',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
