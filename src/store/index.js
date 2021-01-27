import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    logined: false,
    token: '',
    userInfo: {}
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
    }
}

const actions = {
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})