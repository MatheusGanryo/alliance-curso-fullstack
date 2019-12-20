import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/carteira',
    name: 'carteira',
    // route level code-splitting
    // this generates a separate chunk (ativos.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "carteira" */ '../views/Carteira.vue')
  },
  {
      path: '/ativos',
      name: 'ativos',
      component: () => import(/* webpackChunkName: "ativos" */ '../views/Ativos.vue')
  },
  {
    path: '/performance',
    name: 'performance',
    component: () => import(/* webpackChunkName: "performance" */ '../views/Performance.vue')
},
]

const router = new VueRouter({
  routes
})

export default router
