
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue'), name: 'login' },
      { path: 'almoxarifado', component: () => import('pages/almox/index.vue'), name: 'almox' },
      { path: 'inventario', component: () => import('pages/almox/Inventary.vue'), name: 'inventary' },
      { path: 'registrar', component: () => import('pages/auth/Register.vue'), name: 'register' }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
