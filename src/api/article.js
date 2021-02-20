import request from './request';

export function getArticles (data) {
    return request({ 
        url: '/article/getArticles', 
        method: 'post',
        data: data
    })
}

export function getArticlesByAuthor (data) {
    return request({ 
        url: '/article/getArticlesByAuthor', 
        method: 'post',
        data: data
    })
}

export function getArticlesByCollection(data) {
    return request({ 
        url: '/article/getArticlesByCollection', 
        method: 'post',
        data: data
    })
}

export function getArticleById(data) {
    return request({ 
        url: '/article/getArticleById', 
        method: 'post',
        data: data
    })
}

export function likeArticleB(data) {
    return request({ 
        url: '/article/likeArticle', 
        method: 'post',
        data: data
    })
}

export function viewArticleB(data) {
    return request({ 
        url: '/article/viewArticle', 
        method: 'post',
        data: data
    })
}