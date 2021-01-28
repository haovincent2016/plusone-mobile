import request from './request';

export function saveTask (data) {
    return request({ 
        url: '/task/saveTask', 
        method: 'post',
        data: data
    })
}
