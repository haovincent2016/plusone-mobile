import request from './request';

export function getCollectionsByOwner (data) {
    return request({ 
        url: '/collection/getCollectionsByOwner', 
        method: 'post',
        data: data
    })
}
