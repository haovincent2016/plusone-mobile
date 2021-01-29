import request from './request';

export function getUsers (data) {
    return request({ 
        url: '/admin/getUsers', 
        method: 'post',
        data: data
    })
}