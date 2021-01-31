//引入jwt做token验证
const jwt = require('jsonwebtoken')

//统一设置token有效时间24h
const expireTime = '24h'
const secret = 'qweasd789456'

//引入encrypt
const crypt = require('../public/encrypt')

const user = require('../model/user')

class adminController {
  // 管理员登录
  static async adminLogin(ctx) {
    try {
      const req = ctx.request.body;
      if (!req.username || !req.password) {
        return ctx.body = {
          code: '-1',
          msg: '用户名或密码不能为空'
        }
      } else {
        const data = await user.findOne({
          where: {
            username: req.username
          }
        })
        if (data) {
            if (crypt.decrypt(req.password, data.password)) {
              //判断是否是管理员
              if(data.type === 'admin') {
              //生成token，验证登录有效期
                const token = jwt.sign({
                  username: req.username,
                  password: req.password
                }, secret, { expiresIn: expireTime })
                return ctx.body = {
                  code: '0',
                  token: token,
                  adminInfo: JSON.stringify(data),
                  desc: '登陆成功，欢迎回来~'
                }
              } else {
                return ctx.body = {
                  code: '-1',
                  desc: '暂无权限登陆~'
                }
              }
            }
          } else {
            return ctx.body = {
              code: '-1',
              desc: '该管理员不存在'
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
  // 管理员登出
  static async adminLogout(ctx) {
  }
  // 获取所有用户
  static async getUsers(ctx) {
    try {
      const req = ctx.request.body
      const offset = parseInt((req.page - 1) * req.limit)
      const limit = parseInt(req.limit)
      const users = await user.findAndCountAll({
        limit,
        offset
      })
      return ctx.body = {
        code: '0',
        desc: '获取用户列表成功',
        users: JSON.stringify(users.rows),
        count: users.count
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '获取用户列表失败'
      }
    }
  }
  // 获取所有管理员
  static async getAdminUsers(ctx) {
    try {
      const req = ctx.request.body
      const offset = parseInt((req.page - 1) * req.limit)
      const limit = parseInt(req.limit)
      const users = await user.findAndCountAll({
        where: {
          type: 'admin'
        },
        limit,
        offset
      })
      return ctx.body = {
        code: '0',
        desc: '获取管理员列表成功',
        users: JSON.stringify(users.rows),
        count: users.count
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '获取管理员列表失败'
      }
    }
  }
  //添加用户
  static async createUser(ctx) {
    try {
      const req = ctx.request.body
      req.password = crypt.encrypt(req.password)
      const users = await user.create(req)
      return ctx.body = {
        code: '0',
        desc: '用户添加成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '用户添加失败'
      }
    }
  }
  //编辑用户
  static async editUser(ctx) {
    try {
      const req = ctx.request.body
      const users = await user.update(req.userForm, {
        where: {
          id: req.id
        }
      })
      return ctx.body = {
        code: '0',
        desc: '用户修改成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '用户修改失败'
      }
    }
  }
  //删除用户
  static async deleteUser(ctx) {
    try {
      const req = ctx.request.body
      const users = await user.destroy({
        where: {
          id: req.id
        }
      })
      return ctx.body = {
        code: '0',
        desc: '用户删除成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '用户删除失败'
      }
    }
  }
}

module.exports = adminController