import Vue from 'vue'
import VueRouter from 'vue-router'
import postiApp from '../views/posti-app.vue'
import userProfile from '../views/user-profile.vue'
import login from '../views/login.vue'
import messanger from '../views/messanger.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'postiApp',
    component: postiApp
  },

  {
    path: '/user/:userId',
    name: 'userProfile',
    component: userProfile
  },

  {
    path: '/login',
    name: 'login',
    component: login
  },

  {
    path: '/direct',
    name: 'direct',
    component: messanger
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
