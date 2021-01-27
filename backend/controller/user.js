//引入jwt做token验证
const jwt = require('jsonwebtoken')

//解析token
const tools = require('../public/tools')

//统一设置token有效时间24h
const expireTime = '24h'

//引入数据表模型
const user = require('../model/user')
const collection = require('../model/collection')
const article = require('../model/article')
//自动创建表
user.sync()
collection.sync()
article.sync()

//引入encrypt
const crypt = require('../public/encrypt')

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
  
  //密码登陆
  static async login(ctx, status) {
    try {
      const req = ctx.request.body;
      if (!req.username || !req.password) {
        return ctx.body = {
          code: '-1',
          msg: '用户名或密码不能为空'
        }
      } else {
        const data = await userModule.getUser(req.username);
        if (data) {
            if (crypt.decrypt(req.password, data.password)) {
              //生成token，验证登录有效期
              const token = jwt.sign({
                user: req.username,
                passWord: req.password
              }, 'qweasd789456', { expiresIn: expireTime });
              const info = {
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                username: data.username,
                userid: data.userid
              }
              return ctx.body = {
                code: '0',
                token: token,
                userInfo: JSON.stringify(info),
                desc: status === 1? '登陆成功，欢迎回来~' : '注册成功，已自动登录~'
              }
            } else {
              return ctx.body = {
                code: '-1',
                desc: status === 1? '登陆失败，密码错误' : '数据错误'
              }
            }
          } else {
            return ctx.body = {
              code: '-1',
              desc: '该用户尚未注册'
            }
          }
      };
    } catch(err) {
      return ctx.body = {
        code: '-44',
        desc: '请求返回错误'
      }
    }
  }
  //注册用户
  static async create(ctx) {
    try {
      const req = ctx.request.body;
      if (req.username && req.password) {
        try {
          const query = await userModule.getUser(req.username);
          if (query) {
            ctx.response.status = 200;
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
            const data = await userModule.userRegister(param);

            ctx.response.status = 200;
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
          ctx.response.status = 416;
          ctx.body = {
            code: -1,
            desc: '注册失败，请重试'
          }
        }
      }
    } catch(err) {
      return ctx.body = {
        code: '-44',
        desc: '请求返回错误'
      }
    }
  }

  //获取用户信息(除密码外)
  static async getUserInfo(ctx){
    try {
      const req = ctx.request.body;
      const token = ctx.headers.authorization;
      if(token){
        try {
          const result = await tools.verToken(token);
          if (!req.username) {
            return ctx.body = {
              code: '-1',
              desc: '参数错误'
            }
          } else {
            let data = await userModule.getUser(req.username);
            if (req.username == data.username) {
              const info = {
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                username: data.username,
                userid: data.userid
              };
              return ctx.body = {
                code: '0',
                userInfo: JSON.stringify(info),
                desc: '获取用户信息成功'
              }
            }
          }
        } catch (error) {
          ctx.status = 401;
          return ctx.body = {
            code: '-1',
            desc: '登陆过期，请重新登陆'
          }
        }
      }else{
        ctx.status = 401;
        return ctx.body = {
          code: '-1',
          desc: '登陆过期，请重新登陆'
        }
      }
    } catch(err) {
      return ctx.body = {
        code: '-44',
        desc: '请求返回错误'
      }
    }
  } 
}

module.exports = userController