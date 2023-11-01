import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      requireAuth: true,
      verificarRol: true,
      rol: 'admin'
    },
    // route level code-splitting 
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/areas',
    name: 'areas',
    component: () => import(/* webpackChunkName: "areas" */ '../views/Area.vue')
  },
  {
    path: '/areas/:id',
    name: 'areasUpdate',
    component: () => import(/* webpackChunkName: "areasUpdate" */ '../views/AreaUpdate.vue')
  },
  {
    path: '/activos',
    name: 'activos',
    meta: {
      requireAuth: false,
      verificarRol: true,
      rol: 'admin',
      precondicion:"areas"
    },
    component: () => import(/* webpackChunkName: "activos" */ '../views/Activos.vue')
  },
  {
    path: '/activos/:id',
    name: 'activos',
    component: () => import(/* webpackChunkName: "activosUpdate" */ '../views/Activos.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some((record) => record.meta.requireAuth)){
    if(null === localStorage.getItem('auth') || 'false' == localStorage.getItem('auth')){
      next({name: "home"});
    }
  }
  next();
});

export default router

/**
 * a->b->c
 * x->b
 */