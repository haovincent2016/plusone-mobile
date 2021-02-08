//解析token
const tools = require('./tools')

async function authCheck(ctx, next) {
  let url = ctx.request.url
  // 登录 不用检查
  if (url == "/admin/adminLogin" || url == "/user/login" || url == "/user/register") await next()
  else {
    // 规定token写在header的'autohrization' 
    let token = ctx.header.athorization
    // 解码
    try {
      let payload = await tools.verifyToken(token)
      let { time, timeout } = payload
      let data = new Date().getTime()
      if (data - time <= timeout) {
        // 未过期
        await next()
      } else {
        //过期
        ctx.body = {
          code: '-1',
          desc: '已过期'
        }
      }
    } catch(err) {
      return ctx.body = {
        code: '-1',
        desc: '错误token'
      }
    }
  }
}

module.exports = authCheck