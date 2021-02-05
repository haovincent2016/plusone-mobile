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


/**
 * 文章管理部分
 * @param {*} data 
 */
/* 获取所有文章 */
export function getArticlesB (data) {
    return request({ 
        url: '/admin/getArticles', 
        method: 'post',
        data: data
    })
}

/* 获取指定id文章 */
export function getArticleB (data) {
    return request({ 
        url: '/admin/getArticle', 
        method: 'post',
        data: data
    })
}

/* 添加文章 */
export function createArticleB (data) {
    return request({ 
        url: '/admin/createArticle', 
        method: 'post',
        data: data
    })
}

/* 编辑文章 */
export function editArticleB (data) {
    return request({ 
        url: '/admin/editArticle', 
        method: 'post',
        data: data
    })
}

/* 删除文章 */
export function deleteArticleB (data) {
    return request({ 
        url: '/admin/deleteArticle', 
        method: 'post',
        data: data
    })
}

/* 批量删除文章 */
export function batchDeleteArticlesB (data) {
    return request({ 
        url: '/admin/batchDeleteArticles', 
        method: 'post',
        data: data
    })
}

/**
 * 打卡管理部分
 * @param {*} data 
 */
/* 用户名 --> 信息 */
export function getUserInfoB (data) {
    return request({ 
        url: '/admin/getUserInfo', 
        method: 'post',
        data: data
    })
}

/* 获取所有task */
export function getTasksB (data) {
    return request({ 
        url: '/admin/getTasks', 
        method: 'post',
        data: data
    })
}

/* 添加打卡 */
export function createTaskB (data) {
    return request({ 
        url: '/admin/createTask', 
        method: 'post',
        data: data
    })
}

/* 编辑打卡 */
export function editTaskB (data) {
    return request({ 
        url: '/admin/editTask', 
        method: 'post',
        data: data
    })
}

/* 删除打卡 */
export function deleteTaskB (data) {
    return request({ 
        url: '/admin/deleteTask', 
        method: 'post',
        data: data
    })
}

/* 批量删除打卡 */
export function batchDeleteTasksB (data) {
    return request({ 
        url: '/admin/batchDeleteTasks', 
        method: 'post',
        data: data
    })
}
