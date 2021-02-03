import request from './request';

export function saveTaskB (data) {
    return request({ 
        url: '/task/saveTask', 
        method: 'post',
        data: data
    })
}
