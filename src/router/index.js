import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/Home'
import Price from 'pages/Price'
import About from 'pages/About'
import Contact from 'pages/Contact'
import User from 'pages/User'
import Login from 'pages/Login'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: '/price',
    component: Price,
    name: 'Price'
  },
  {
    path: '/about',
    component: About,
    name: 'About'
  },
  {
    path: '/contact',
    component: Contact,
    name: 'Contact'
  },
  {
    path: '/user',
    component: User,
    name: 'User'
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  }
]

export default new Router({
  routes
})
