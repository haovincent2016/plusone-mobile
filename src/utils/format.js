import request from '../api/request'

export function getRefreshToken(data) {
  return request({ 
    url: '/user/refreshToken', 
    method: 'post',
    data: data
  })
}
  
export function resetExpireTime(timestamp) {
  clearInterval(window.interval)
  window.interval = setInterval(()=>{
    timestamp=timestamp-1
    localStorage.setItem('refreshTime', timestamp)
  }, 1000)
}