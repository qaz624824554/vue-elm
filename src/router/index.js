import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../pages/home/home.vue')
const City = () => import('../pages/city/city.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/city/:id',
    component: City
  }
]

const router = new VueRouter({
  routes
})

export default router
