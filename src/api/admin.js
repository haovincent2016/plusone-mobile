import request from './request';

/**
 * 后台请求函数名加B表Backend
 * @param {*} data 
 */
/* 管理员登陆 */
export function adminLoginB (data) {
    return request({
        url: '/admin/adminLogin',
        method: 'post',
        data: data
    })
}
/* 管理员登出 */
export function adminLogoutB (data) {
    return request({
        url: '/admin/adminLogout',
        method: 'post',
        data: data
    })
}

/**
 * 用户管理部分
 * @param {*} data 
 */
/* 获取所有用户 */
export function getUsersB (data) {
    return request({ 
        url: '/admin/getUsers', 
        method: 'post',
        data: data
    })
}
/* 获取所有管理员 */
export function getAdminUsersB (data) {
    return request({ 
        url: '/admin/getAdminUsers', 
        method: 'post',
        data: data
    })
}

/* 添加用户 */
export function createUserB (data) {
    return request({ 
        url: '/admin/createUser', 
        method: 'post',
        data: data
    })
}

/* 编辑用户 */
export function editUserB (data) {
    return request({ 
        url: '/admin/editUser', 
        method: 'post',
        data: data
    })
}

/* 删除用户 */
export function deleteUserB (data) {
    return request({ 
        url: '/admin/deleteUser', 
        method: 'post',
        data: data
    })
}

/* 批量删除用户 */
export function batchDeleteUsersB (data) {
    return request({ 
        url: '/admin/batchDeleteUsers', 
        method: 'post',
        data: data
    })
}