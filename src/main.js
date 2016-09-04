import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import App from './App'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import AddBook from './components/AddBook'

Vue.use(VueResource)
Vue.use(VueRouter)

// 发送带凭证的请求
Vue.http.options.credentials = true

const router = new VueRouter()

router.map({
  '/': {
    component: Home
  },
  '/register': {
    component: Register
  },
  '/login': {
    component: Login
  },
  '/home': {
    component: Home
  },
  '/addbook': {
    component: AddBook
  }
})

router.start(App, '#app')
