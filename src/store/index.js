import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const state = {
    logined: false,
    token: '',
    userInfo: {},

    //后台管理系统
    isAdmin: false,
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
    //是否固定上导航栏
    isFixedView: true
}

const mutations = {
    adminLogin (state) {
        state.isAdmin = true
    },
    adminLogout (state) {
        state.isAdmin = false
    },
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
    //toggle左菜单
    toggleSideMenu (state) {
        state.sideMenu.opened = !state.sideMenu.opened
        if(state.sideMenu.opened) {
            Cookies.set('sideMenuStatus', 1)
        } else {
            Cookies.set('sideMenuStatus', 0)
        }
    }
}

const actions = {
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})