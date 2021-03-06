import request from './request';

//检测用户名
export function testNameB (data) {
    return request({ 
        url: '/user/testName', 
        method: 'post',
        data: data
    })
}


//注册
export function register (data) {
    return request({ 
        url: '/user/register', 
        method: 'post',
        data: data
    })
}

//登录
export function login (data) {
    return request({ 
        url: '/user/login', 
        method: 'post',
        data: data
    })
}

//获取用户信息
export function getUserInfo (data) {
    return request({ 
        url: '/user/getUserInfo', 
        method: 'post',
        data: data
    })
}