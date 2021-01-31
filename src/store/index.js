import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
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
  //菜单
  routes: siteRoutes,
  //左菜单
  sideMenu: {
      opened: Cookies.get('sideMenuStatus') ? !!+Cookies.get('sideMenuStatus') : true
  },
  //访问设备
  device: 'desktop',
  //是否显示logo
  isLogoView: true,
  //是否显示Breadcrumb
  isTagsView: true,
  //浏览过的页面
  visitedView: [],
  //缓存的页面
  cachedView: [],
  //是否固定上导航栏
  isFixedView: true
}

const mutations = {
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
  },

  adminLogin (state, user) {
    state.isAdmin = true
    state.adminInfo = JSON.parse(user.adminInfo)
    state.adminToken = user.token
    sessionStorage.setItem("store", JSON.stringify(state))
    localStorage.setItem("token", user.token)
  },
  adminLogout (state) {
    state.isAdmin = false
    state.adminInfo = {}
    state.adminToken = ''
    sessionStorage.removeItem("store")
    localStorage.removeItem("token")
  },
  
  //toggle左菜单
  toggleSideMenu (state) {
    state.sideMenu.opened = !state.sideMenu.opened
    if(state.sideMenu.opened) {
      Cookies.set('sideMenuStatus', 1)
    } else {
      Cookies.set('sideMenuStatus', 0)
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
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})