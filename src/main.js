import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import App from './App'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import AddBook from './components/AddBook'
import Cart from './components/Cart'

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
  },
  '/cart': {
    component: Cart
  }
})

router.start(App, '#app')
