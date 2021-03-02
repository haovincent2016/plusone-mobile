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


/**
 * 设置部分
 * @param {*} data 
 */
/* 获取所有主页设置 */
export function getAllSettingsB (data) {
    return request({ 
        url: '/setting/all', 
        method: 'post',
        data: data
    })
}
/* 获取指定主页设置 */
export function getSettingB (data) {
    return request({ 
        url: '/setting/item', 
        method: 'post',
        data: data
    })
}
/* 创建主页设置 */
export function createSettingB (data) {
    return request({ 
        url: '/setting/create', 
        method: 'post',
        data: data
    })
}
/* 编辑主页设置 */
export function editSettingB (data) {
    return request({ 
        url: '/setting/edit/'+data.id, 
        method: 'post',
        data: data
    })
}
/* 删除主页设置 */
export function deleteSettingB (data) {
    return request({ 
        url: '/setting/delete', 
        method: 'post',
        data: data
    })
}

/**
 * 试卷部分
 * @param {*} data 
 */
/* 获取所有试卷 */
export function getAllTestsB (data) {
    return request({ 
        url: '/test/all', 
        method: 'post',
        data: data
    })
}
/* 获取指定试卷 */
export function getTestB (data) {
    return request({ 
        url: '/test/item', 
        method: 'post',
        data: data
    })
}
/* 获取指定给用户的试卷 */
export function getUserTestsB (data) {
    return request({ 
        url: '/test/userAll', 
        method: 'post',
        data: data
    })
}
/* 创建试卷 */
export function createTestB (data) {
    return request({ 
        url: '/test/create', 
        method: 'post',
        data: data
    })
}
/* 编辑试卷 */
export function editTestB (data) {
    return request({ 
        url: '/test/edit/'+data.id, 
        method: 'post',
        data: data
    })
}
/* 删除试卷 */
export function deleteTestB (data) {
    return request({ 
        url: '/test/delete', 
        method: 'post',
        data: data
    })
}
/* 批量删除试卷 */
export function batchDeleteTestsB (data) {
    return request({ 
        url: '/test/batchDelete', 
        method: 'post',
        data: data
    })
}