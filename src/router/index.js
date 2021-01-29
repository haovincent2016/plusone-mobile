import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/Home'
import Price from 'pages/Price'
import About from 'pages/About'
import Contact from 'pages/Contact'
import User from 'pages/User'
import Login from 'pages/Login'
import Quiz from 'pages/Quiz'
import Collection from 'pages/Collection'
import Task from 'pages/Task'
import Files from 'pages/Files'
import Article from 'pages/Article'

//后台管理系统
import Layout from '@/layout'

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
  },
  //每日任务打卡
  {
    path: '/task',
    component: Task,
    name: 'Task'
  },
  //免费英语能力测试
  {
    path: '/quiz',
    component: Quiz,
    name: 'Quiz'
  },
  //文章收藏夹
  {
    path: '/collection',
    component: Collection,
    name: 'Collection'
  },
  //资料下载中心
  {
    path: '/files',
    component: Files,
    name: 'Files'
  },
  {
    path: '/articles/:id',
    component: Article,
    name: 'Article'
  },

  //后台管理首页,meta带有affix不可去掉tag
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/admin/dashboard'),
        name: 'Dashboard',
        meta: { title: 'dashboard', affix: true }
      }
    ]
  },
  //后台管理用户管理
  {
    path: '/admin-user',
    component: Layout,
    redirect: '/admin-user/user',
    children: [
      {
        path: 'user',
        component: () => import('@/pages/admin-user/user'),
        name: 'User',
        meta: { title: 'user' }
      },
      {
        path: 'operator',
        component: () => import('@/pages/admin-user/operator'),
        name: 'Operator',
        meta: { title: 'operator' }
      }
    ]
  }
]

export default new Router({
  routes
})
