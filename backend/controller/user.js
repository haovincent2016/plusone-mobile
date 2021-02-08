//引入jwt做token验证
const jwt = require('jsonwebtoken')

//解析token
const tools = require('../utils/tools')

//统一设置token有效时间24h
const shortExpire = '2h'
const longExpire = '24h'
const secret = 'qweasd789456'

//引入encrypt
const crypt = require('../utils/encrypt')

const user = require('../model/user')

//数据库操作类
class userModule {
  static async userRegister(data) {
    try {
      return await user.create({
        password: crypt.encrypt(data.password),
        username: data.username
      })
    } catch(err) {
      console.log(err)
    }
  }

  static async getUser(username) {
    try {
      return await user.findOne({
        where: {
          username
        }
      })
    } catch(err) {
      console.log(err)
    }
  }
}

class userController {
  //校验用户名
  static async testName(ctx) {
    try {
      const req = ctx.request.body
      const data = await user.findAll({
        attributes: ['username'],
        where: {
          username: req.username
        },
      })
      if(data.length === 0) {
        return ctx.body = {
          code: '0',
          desc: '该用户名可用~',
          user: data
        }
      } else {
        return ctx.body = {
          code: '-1',
          desc: '该用户名不可用，请换一个名字~',
          user: data
        }
      }
    } catch(err) {
      return ctx.body = {
        code: '-44',
        desc: '检测失败，请重试'
      }
    }
  }
  //密码登陆
  static async login(ctx, status) {
    try {
      const req = ctx.request.body
      if (!req.username || !req.password) {
        return ctx.body = {
          code: '-1',
          msg: '用户名或密码不能为空'
        }
      } else {
        const data = await userModule.getUser(req.username)
        if (data) {
            if (crypt.decrypt(req.password, data.password)) {
              //生成token，验证登录有效期
              const token = jwt.sign({
                username: req.username,
                password: req.password
              }, secret, { expiresIn: shortExpire })
              return ctx.body = {
                code: '0',
                token: token,
                expire: 2,
                userInfo: JSON.stringify(data),
                desc: status === 1? '登陆成功，欢迎回来~' : '注册成功，已自动登录~'
              }
            } else {
              return ctx.body = {
                code: '-1',
                desc: status === 1? '用户已存在，密码错误' : '数据错误'
              }
            }
          } else {
            return ctx.body = {
              code: '-1',
              desc: '该用户尚未注册'
            }
          }
      }
    } catch(err) {
      return ctx.body = {
        code: '-44',
        desc: '请求登录返回错误'
      }
    }
  }
  //注册用户
  static async create(ctx) {
    try {
      const req = ctx.request.body
      if (req.username && req.password) {
        try {
          const query = await userModule.getUser(req.username)
          if (query) {
            ctx.response.status = 200
            ctx.body = {
              code: -1,
              desc: '用户已存在'
            }
            // 已注册用户自动登录，验证密码
            // 1表示已注册用户， 2表示新注册用户
            const auto = await userController.login(ctx, 1)
          } else {
            const param = {
              password: req.password,
              username: req.username
            }
            const data = await userModule.userRegister(param)

            ctx.response.status = 200
            ctx.body = {
              code: 0,
              desc: '用户注册成功',
              userInfo: {
                username: req.username
              }
            }
            // 注册成功后自动登录
            // 1表示已注册用户， 2表示新注册用户
            const auto = await userController.login(ctx, 2)
          }
        } catch (error) {
          console.log(error)
          ctx.response.status = 416
          ctx.body = {
            code: -1,
            desc: '注册失败，请重试'
          }
        }
      }
    } catch(err) {
      return ctx.body = {
        code: '-44',
        desc: '请求注册返回错误',
        err: err
      }
    }
  }

  //获取用户信息(除密码外)
  static async getUserInfo(ctx){
    try {
      const req = ctx.request.body
      const token = ctx.headers.authorization
      if(token){
        try {
          const result = await tools.verifyToken(token)
          if (!req.username) {
            return ctx.body = {
              code: '-1',
              desc: '参数错误'
            }
          } else {
            let data = await userModule.getUser(req.username)
            if (req.username == data.username) {
              return ctx.body = {
                code: '0',
                userInfo: JSON.stringify(data),
                desc: '获取用户信息成功'
              }
            }
          }
        } catch (error) {
          ctx.status = 401
          return ctx.body = {
            code: '-1',
            desc: '登陆过期，请重新登陆'
          }
        }
      }else{
        ctx.status = 401
        return ctx.body = {
          code: '-1',
          desc: '登陆过期，请重新登陆'
        }
      }
    } catch(err) {
      return ctx.body = {
        code: '-44',
        desc: '请求用户信息返回错误'
      }
    }
  }
  
  // 刷新token
  static async refreshToken(ctx) {
    try {
      let payload = await tools.verifyToken(token)
      jwt.sign({
        username: payload.username,
        password: payload.password
      }, secret, { expiresIn: longExpire })
      return ctx.body = {
        code: '0',
        token: token,
        expire: 24,
        desc: '刷新token成功'
      }
    } catch(err) {
      return ctx.body = {
        code: '-44',
        desc: '请求刷新token返回错误'
      }
    }
  }
}

module.exports = userController