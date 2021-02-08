import request from './request';

export function getFilesB (data) {
    return request({ 
        url: '/public/downloads', 
        method: 'post',
        data: data
    })
}