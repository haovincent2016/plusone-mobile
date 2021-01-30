import request from './request';

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
/* 获取所有用户 */
export function getUsers (data) {
    return request({ 
        url: '/admin/getUsers', 
        method: 'post',
        data: data
    })
}
/* 获取所有管理员 */
export function getAdminUsers (data) {
    return request({ 
        url: '/admin/getAdminUsers', 
        method: 'post',
        data: data
    })
}