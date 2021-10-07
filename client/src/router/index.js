import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Feed from '../views/Feed.vue'
import Session from '../services/session'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed,
    meta: {requiresLogin: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.requiresLogin && !Session.user){
    next('/login');
  }else{
    next();
  }
})

export default router
