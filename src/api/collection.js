import request from './request';

//用户的收藏夹
export function getCollectionsByOwner (data) {
    return request({ 
        url: '/collection/getCollectionsByOwner', 
        method: 'post',
        data: data
    })
}

//新建收藏夹
export function createCollection (data) {
    return request({ 
        url: '/collection/createCollection', 
        method: 'post',
        data: data
    })
}

//添加文章到收藏夹
export function addToCollection (data) {
    return request({ 
        url: '/collection/addToCollection', 
        method: 'post',
        data: data
    })
}


//删除收藏夹中文章
export function deleteFromCollection (data) {
    return request({ 
        url: '/collection/deleteFromCollection', 
        method: 'post',
        data: data
    })
}

//编辑收藏夹
export function editCollection (data) {
    return request({ 
        url: '/collection/editCollection', 
        method: 'post',
        data: data
    })
}