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
    path: '/Task',
    component: Task,
    name: 'Task'
  },
  //免费英语能力测试
  {
    path: '/Quiz',
    component: Quiz,
    name: 'Quiz'
  },
  //文章收藏夹
  {
    path: '/Collection',
    component: Collection,
    name: 'Collection'
  },
  //资料下载中心
  {
    path: '/Files',
    component: Files,
    name: 'Files'
  },
  {
    path: '/Articles/:id',
    component: Article,
    name: 'Article'
  },
]

export default new Router({
  routes
})
