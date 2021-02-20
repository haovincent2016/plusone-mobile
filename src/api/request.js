import axios from 'axios'
import qs from 'qs'
import route from '../router'
import { getRefreshToken, resetExpireTime } from '../utils/format'
import url from '../utils/setting'

//是否已经刷新过token
window.refreshed = false

const service = axios.create({
  baseURL: url,
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    // 处理请求参数
    config.data = qs.stringify(config.data)
    // 将token写入请求头
    if (localStorage.getItem('token')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config
  }, 
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

service.interceptors.response.use(
  response => {
    let refreshTime = localStorage.getItem('refreshTime')
    let token = localStorage.getItem('token')
    if (token && refreshTime) {
      if(refreshTime < 1200) {
        if(!window.refreshed) {
          getRefreshToken().then(res => {
            if(res.data.code === '0') {
              window.refreshed = false
              resetExpireTime(res.data.expire)
              this.$store.commit('refreshToken', res.data)
            }
          }).catch(err => {})
        }
      }
    } else {
      window.refreshed = false
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$toast.fail("登录过期，请重新登录")
          localStorage.removeItem("token")
          route.replace({ //跳转到登录页面
            path: '/Login',
            query: {
              // 将跳转的路由path作为参数，登录成功后跳转到该路由
              redirect: route.currentRoute.fullPath
            } 
          })
        case 403:
          this.$toast.fail("您没有访问权限")
          route.replace({ //跳转到登录页面
            path: '/Login',
            query: {
              // 将跳转的路由path作为参数，登录成功后跳转到该路由
              redirect: route.currentRoute.fullPath
            } 
          })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)

export default service