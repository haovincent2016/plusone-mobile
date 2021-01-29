import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import router from '@/router'

Vue.use(Vuex)

const state = {
    logined: false,
    token: '',
    userInfo: {},

    //后台管理系统
    isAdmin: false,
    //菜单
    routes: router,
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
    userLogin (state, user) {
        state.logined = true
        state.userInfo = JSON.parse(user.userInfo)
        state.token = user.token
        sessionStorage.setItem("store", JSON.stringify(state))
    },
    userLogout (state) {
        state.logined = false
        state.userInfo = {}
        state.token = ''
        sessionStorage.removeItem("store")
    },

    setRoutes(state, routes) {
        //state.addRoutes = routes
        //state.routes = router.concat(routes)
    },

    adminLogin (state) {
        state.isAdmin = true
    },
    adminLogout (state) {
        state.isAdmin = false
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
    addCachedView (state, view) {
        if (state.cachedView.includes(view.name)) return
        if (!view.meta.noCache) {
          state.cachedView.push(view.name)
        }
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
    //删除缓存的tag
    delCachedView (state, view) {
        const index = state.cachedView.indexOf(view.name)
        index > -1 && state.cachedView.splice(index, 1)
    }
}

const actions = {
    addView({ dispatch }, view) {
        dispatch('addVisitedView', view)
        dispatch('addCachedView', view)
    },
    addVisitedView({ dispatch }, view) {
        dispatch('addVisitedView', view)
    },
    updateVisitedView({ dispatch }, view) {
        dispatch('updateVisiedView', view)
    },
    delView({ dispatch, state }, view) {
        return new Promise(resolve => {
            dispatch('delVisitedView', view)
            dispatch('delCachedView', view)
            resolve({
                visitedViews: [...state.visitedViews],
                cachedViews: [...state.cachedViews]
            })
        })
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})