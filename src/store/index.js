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
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true
    },
    //访问设备
    device: 'desktop',
    //是否显示logo
    isLogoView: true,
    //是否显示Breadcrumb
    isTagsView: true,
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
    }
}

const actions = {
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})