import Vue from 'vue'
import Vuex from 'vuex'
import { siteRoutes } from '@/router'

Vue.use(Vuex)

const state = {
  //用户界面
  logined: false,
  token: '',
  userInfo: {},

  //后台管理系统
  isAdmin: false,
  adminToken: '',
  adminInfo: {},

  //页面结构 - 菜单
  routes: siteRoutes,
  //页面结构 - 左菜单
  sideMenu: {
      opened: sessionStorage.getItem('sideMenuStatus') ? !!+sessionStorage.getItem('sideMenuStatus') : true
  },
  //页面结构 - 访问设备
  device: 'desktop',
  //页面结构 - 是否显示logo
  isLogoView: true,
  //页面结构 - 是否显示Breadcrumb
  isTagsView: true,
  //页面结构 - 浏览过的页面
  visitedView: [],
  //页面结构 - 缓存的页面
  cachedView: [],
  //页面结构 - 是否固定上导航栏
  isFixedView: true,

  //特殊设置 - 已添加的组件
  componentsList: []
}

const mutations = {
  //localStorage储存token和refreshTime，数据永久保存，除非用户手动清理客户端缓存。
  refreshToken (state, data) {
    localStorage.setItem("token", data.token)
    let refreshTime = data.expire * 3600
    localStorage.setItem("refreshTime", refreshTime)
  },
  userLogin (state, user) {
    state.logined = true
    state.userInfo = JSON.parse(user.userInfo)
    state.token = user.token
    sessionStorage.setItem("store", JSON.stringify(state))
    localStorage.setItem("token", user.token)
    let refreshTime = user.expire * 3600
    localStorage.setItem("refreshTime", refreshTime)
  },
  userLogout (state) {
    state.logined = false
    state.userInfo = {}
    state.token = ''
    sessionStorage.removeItem("store")
    localStorage.removeItem("token")
    localStorage.removeItem("refreshTime")
  },

  adminLogin (state, user) {
    state.isAdmin = true
    state.adminInfo = JSON.parse(user.adminInfo)
    state.adminToken = user.token
    sessionStorage.setItem("store", JSON.stringify(state))
    localStorage.setItem("token", user.token)
    let refreshTime = user.expire * 3600
    localStorage.setItem("refreshTime", refreshTime)
  },
  adminLogout (state) {
    state.isAdmin = false
    state.adminInfo = {}
    state.adminToken = ''
    sessionStorage.removeItem("store")
    localStorage.removeItem("token")
    localStorage.removeItem("refreshTime")
  },
  
  //toggle左菜单
  toggleSideMenu (state) {
    state.sideMenu.opened = !state.sideMenu.opened
    if(state.sideMenu.opened) {
      sessionStorage.setItem('sideMenuStatus', 1)
    } else {
      sessionStorage.setItem('sideMenuStatus', 0)
    }
  },
  addVisitedView (state, view) {
    if (state.visitedView.some(v => v.path === view.path)) return
    state.visitedView.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  //更新浏览过的tag
  updateVisiedView (state, view) {
    for (let v of state.visitedView) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },
  //删除浏览过的tag
  delVisitedView (state, view) {
    for (const [i, v] of state.visitedView.entries()) {
      if (v.path === view.path) {
        state.visitedView.splice(i, 1)
        break
      }
    }
  },

  //添加特殊设置中的组件
  addComponents(state, item) {
    state.componentsList.push(item)
  }
}

const actions = {
  addView({ commit }, view) {
    commit('addVisitedView', view)
  },
  updateView({ commit }, view) {
    commit('updateVisiedView', view)
  },
  delView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('delVisitedView', view)
      resolve({
        visitedView: [...state.visitedView]
      })
    })
  },

  addComp({ commit }, item) {
    commit('addComponents', item)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})