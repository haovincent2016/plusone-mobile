import request from './request';

//用户的收藏夹
export function getCollectionsByOwner (data) {
    return request({ 
        url: '/collection/getCollectionsByOwner', 
        method: 'post',
        data: data
    })
}

// 获取收藏夹中文章
export function getArticleByCollection (data) {
    return request({ 
        url: '/collection/getArticleByCollection', 
        method: 'post',
        data: data
    })
}

//新建收藏夹
export function createCollectionB (data) {
    return request({ 
        url: '/collection/createCollection', 
        method: 'post',
        data: data
    })
}

//添加文章到收藏夹
export function addToCollectionB (data) {
    return request({ 
        url: '/collection/addToCollection', 
        method: 'post',
        data: data
    })
}

//收藏夹是否有文章
export function collectionHasArticleB (data) {
    return request({ 
        url: '/collection/collectionHasArticle', 
        method: 'post',
        data: data
    })
}

//删除收藏夹中文章
export function deleteFromCollectionB (data) {
    return request({ 
        url: '/collection/deleteFromCollection', 
        method: 'post',
        data: data
    })
}

// 清空收藏夹
export function clearCollectionB (data) {
    return request({ 
        url: '/collection/clearCollection', 
        method: 'post',
        data: data
    })
}

//编辑收藏夹
export function editCollectionB (data) {
    return request({ 
        url: '/collection/editCollection', 
        method: 'post',
        data: data
    })
}

// 删除收藏夹
export function deleteCollectionB (data) {
    return request({ 
        url: '/collection/editCollection', 
        method: 'post',
        data: data
    })
}