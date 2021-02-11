import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Player',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "player" */ '../views/Player.vue')
  },
  {
    path: '/preference',
    name: 'Preference',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "preference" */ '../views/Preference.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
