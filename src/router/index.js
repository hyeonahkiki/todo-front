// django에서 url.py와 같은느낌
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// 파일을 불러왔다.
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  // 새로운 경로 생성
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
