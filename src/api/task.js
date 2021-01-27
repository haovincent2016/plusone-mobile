import request from './request';

export function uploadTask (data) {
    return request({ 
        url: '/upload/uploadTask', 
        method: 'post',
        data: data,
        headers: {
            'enctype': 'multipart/form-data'
        }
    })
}
