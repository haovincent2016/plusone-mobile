import Vue from 'vue'
import Router from 'vue-router'

import Home from 'pages/frontend/Home'
import Price from 'pages/frontend/Price'
import About from 'pages/frontend/About'
import Contact from 'pages/frontend/Contact'
import User from 'pages/frontend/User'
import Login from 'pages/frontend/Login'
import Quiz from 'pages/frontend/Quiz'
import Collection from 'pages/frontend/Collection'
import Task from 'pages/frontend/Task'
import Files from 'pages/frontend/Files'
import Article from 'pages/frontend/Article'
import UserEdit from 'pages/frontend/UserEdit'
import CollectionDetail from 'pages/frontend/CollectionDetail'

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
  //个人信息编辑页（头像，名称，背景图）
  {
    path: '/user/edit',
    component: UserEdit,
    name: 'UserEdit'
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
  //收藏夹详情页
  {
    path: '/collection/:id',
    component: CollectionDetail,
    name: 'CollectionDetail'
  },
  //资料下载中心
  {
    path: '/files',
    component: Files,
    name: 'Files'
  },
  //文章详情页
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
      },
      {
        path: 'edit/:id',
        component: () => import('@/pages/admin-article/write'),
        name: 'Edit',
        meta: { title: '文章编辑' }
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
        path: 'special-list',
        component: () => import('@/pages/admin-setting/list'),
        name: 'SpecialList',
        meta: { title: '主页设置' }
      },
      {
        path: 'create',
        component: () => import('@/pages/admin-setting/special'),
        name: 'CreateSetting',
        meta: { title: '新建设置' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/pages/admin-setting/special'),
        name: 'EditSetting',
        meta: { title: '修改设置' }
      }
    ]
  },
  //后台管理 - 资源管理
  // {
  //   path: '/admin-assets',
  //   component: Layout,
  //   redirect: '/admin-assets/list',
  //   children: [
  //     {
  //       path: 'list',
  //       component: () => import('@/pages/admin-assets/list'),
  //       name: 'AssetsList',
  //       meta: { title: '资源管理' }
  //     },
  //     {
  //       path: 'upload',
  //       component: () => import('@/pages/admin-assets/upload'),
  //       name: 'Upload',
  //       meta: { title: '资源上传' }
  //     }
  //   ]
  // },
  //后台管理 - 测试管理
  {
    path: '/admin-tests',
    component: Layout,
    redirect: '/admin-tests/grade',
    children: [
      {
        path: 'grade',
        component: () => import('@/pages/admin-tests/grade'),
        name: 'Grade',
        meta: { title: '成绩管理' }
      },
      {
        path: 'list',
        component: () => import('@/pages/admin-tests/list'),
        name: 'TestList',
        meta: { title: '测试列表' }
      },
      {
        path: 'edit/:id',
        component: () => import('@/pages/admin-tests/detail'),
        name: 'EditTest',
        meta: { title: '修改测试' }
      },
      {
        path: 'create',
        component: () => import('@/pages/admin-tests/detail'),
        name: 'CreateTest',
        meta: { title: '新建测试' }
      }
    ]
  },
  //后台管理 - 消息推送
  {
    path: '/admin-messages',
    component: Layout,
    redirect: '/admin-messages/list',
    children: [
      {
        path: 'list',
        component: () => import('@/pages/admin-messages/list'),
        name: 'MessageList',
        meta: { title: '消息列表' }
      }
    ]
  },
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

