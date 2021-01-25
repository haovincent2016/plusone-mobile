import axios from 'axios';
import qs from 'qs';
import route from '../router';

axios.interceptors.request.use(function(config) {
    // 处理请求参数
    config.data = qs.stringify(config.data)

    //将token写入请求头
    if (window.localStorage.getItem('token')) {
        config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`;
    }

    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    this.$toast.error("登录过期，请重新登录")
                    window.localStorage.removeItem("token"); //可能是token过期，清除它
                    route.replace({ //跳转到登录页面
                        path: '/Login',
                        query: {
                            // 将跳转的路由path作为参数，登录成功后跳转到该路由
                            redirect: route.currentRoute.fullPath
                        } 
                    })
            }
        }
        return Promise.reject(error) // 返回接口返回的错误信息
    }
);

//注册
export const register = params => {
    return axios.post('http://localhost:3000/user/register', params, {}).then(res => res.data)
}

//登录
export const login = params => {
    return axios.post('http://localhost:3000/user/login', params, {}).then(res => res.data)
}

//获取用户信息
export const getUserInfo = params => {
    return axios.post('http://localhost:3000/user/getUserInfo', params, {}).then(res => res.data)
}