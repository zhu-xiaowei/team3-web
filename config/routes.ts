export default [
  {
    path: '/video/list',
    name: 'admin',
    icon: 'table',
    access: 'canAdmin',
    component: './video/list',
  },
  {
    path: '/video/upload',
    name: 'upload',
    icon: 'upload',
    access: 'canAdmin',
    component: './video/upload',
  },
  {
    path: '/',
    redirect: '/video/list',
  },
  {
    component: './404',
  },
];
