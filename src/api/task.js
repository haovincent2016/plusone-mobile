import request from './request';

export function uploadTask (data) {
    return request({ 
        url: '/task/uploadTask', 
        method: 'post',
        data: data
    })
}
