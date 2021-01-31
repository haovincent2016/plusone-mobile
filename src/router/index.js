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

export const siteRoutes = [
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

  
  /*
  hide: sidemenu隐藏
  meta: 
    affix:不可去tag
    title:breadcrumb和sidemenu名字
    auth: 需要登陆
  */
 //后台管理 - 登录
  {
    path: '/admin-login',
    hide: true,
    name: 'AdminLogin',
    component: () => import('@/pages/admin-login')
  },
 //后台管理 - 首页
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/admin/dashboard'),
        name: 'Dashboard',
        meta: { title: '主页', affix: true, auth: true }
      }
    ]
  },
  //后台管理 - 用户管理
  {
    path: '/admin-user',
    component: Layout,
    redirect: '/admin-user/user',
    children: [
      {
        path: 'user',
        component: () => import('@/pages/admin-user/user'),
        name: 'UserB',
        meta: { title: '用户', auth: true }
      },
      {
        path: 'operator',
        component: () => import('@/pages/admin-user/operator'),
        name: 'Operator',
        meta: { title: '管理员' }
      }
    ]
  },
  //后台管理 - 文章管理
  {
    path: '/admin-article',
    component: Layout,
    redirect: '/admin-article/article',
    children: [
      {
        path: 'article',
        component: () => import('@/pages/admin-article/article'),
        name: 'ArticleB',
        meta: { title: '文章' }
      },
      {
        path: 'collection',
        component: () => import('@/pages/admin-article/collection'),
        name: 'CollectionB',
        meta: { title: '收藏夹' }
      },
      {
        path: 'write',
        component: () => import('@/pages/admin-article/write'),
        name: 'Write',
        meta: { title: '文章创作' }
      }
    ]
  },
  //后台管理 - 打卡管理
  {
    path: '/admin-task',
    component: Layout,
    redirect: '/admin-task/task',
    children: [
      {
        path: 'task',
        component: () => import('@/pages/admin-task/task'),
        name: 'TaskB',
        meta: { title: '打卡列表' }
      },
      {
        path: 'setting',
        component: () => import('@/pages/admin-task/setting'),
        name: 'Setting',
        meta: { title: '打卡设置' }
      }
    ]
  },
  //后台管理 - 设置
  {
    path: '/admin-setting',
    component: Layout,
    redirect: '/admin-setting/common',
    children: [
      {
        path: 'common',
        component: () => import('@/pages/admin-setting/common'),
        name: 'Common',
        meta: { title: '常规设置' }
      },
      {
        path: 'special',
        component: () => import('@/pages/admin-setting/special'),
        name: 'Special',
        meta: { title: '特殊设置' }
      }
    ]
  }
]

const customRouter = new Router({
  routes: siteRoutes
})
//登录验证
customRouter.beforeEach(function(to, from, next) {
  if(to.matched.some(record => record.meta.auth)) {
    //需验证路径
    //没有store
    let store = JSON.parse(sessionStorage.getItem('store'))
    if(!store) {
      next({
        path: '/admin-login',
        query: { redirect: '/admin/dashboard' }
      })
    } else if (store && !store.isAdmin) {
      //未登录
      next({
        path: '/admin-login',
        query: { redirect: to.fullPath }
      })
    } else {
      //已登录
      next()
    }
  } else {
    //不需验证路径
    next()
  }
})

export default customRouter

