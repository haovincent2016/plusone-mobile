import request from './request';

export function getTaskB (data) {
    return request({ 
        url: '/task/getTask', 
        method: 'post',
        data: data
    })
}

export function getWeekTasksB (data) {
    return request({ 
        url: '/task/getWeekTasks', 
        method: 'post',
        data: data
    })
}

export function saveTaskB (data) {
    return request({ 
        url: '/task/saveTask', 
        method: 'post',
        data: data
    })
}

export function addPointsB (data) {
    return request({ 
        url: '/task/addPoints', 
        method: 'post',
        data: data
    })
}
