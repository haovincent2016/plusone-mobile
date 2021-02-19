import request from './request';

export function getFilesB (data) {
    return request({ 
        url: '/public'+data.directory, 
        method: 'post',
        data: data
    })
}