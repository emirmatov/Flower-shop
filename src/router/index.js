import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: () => import('../views/CatalogView.vue'),
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
    },
    // Админка
    {
      path: '/admin',
      name: 'admin-login',
      component: () => import('../views/admin/AdminLogin.vue'),
    },
    {
      path: '/admin/products',
      name: 'admin-products',
      component: () => import('../views/admin/AdminProducts.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: () => import('../views/admin/AdminOrders.vue'),
      meta: { requiresAuth: true },
    },
  ],
})
// Добавь в конец файла перед export default router
import { getAuth } from 'firebase/auth'

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const auth = getAuth()
    const user = auth.currentUser
    if (!user) {
      return '/admin'
    }
  }
})
export default router
