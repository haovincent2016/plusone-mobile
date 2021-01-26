import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    logined: false,
    token: '',
    userInfo: {
        username: ''
    }
}

const mutations = {
    userLogin (state, user) {
        state.logined = true
        state.userInfo.username = user.username
        state.token = user.token
    },
    userLogout (state) {
        state.logined = false
        state.userInfo.username = ''
        state.token = ''
    }
}

const actions = {
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})