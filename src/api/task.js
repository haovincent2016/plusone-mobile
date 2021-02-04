import request from './request';

// 待做：获取用户当日task信息
export function getTaskB (data) {
    return request({ 
        url: '/task/getTask', 
        method: 'post',
        data: data
    })
}

export function saveTaskB (data) {
    return request({ 
        url: '/task/saveTask', 
        method: 'post',
        data: data
    })
}
