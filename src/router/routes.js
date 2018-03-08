
export default [
  {
    path: '/',
    component: () => import('layouts/main'),
    children: [
      { path: '', name: 'home', component: () => import('pages/home') }
    ]
  },
  { path: '/404', name: 'error404', component: () => import('pages/404') },
  { path: '*', component: () => import('pages/404') } // Not found
]
