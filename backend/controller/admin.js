const { sequelize } = require('../config/db')
const user = require('../model/user')

class userController {
  // 所有用户
  static async getUsers(ctx) {
    try {
      const req = ctx.request.body
      const users = await user.findAll()
      return ctx.body = {
        code: '0',
        desc: '获取用户列表成功',
        users: JSON.stringify(users)
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '获取用户列表失败'
      }
    }
  }
}

module.exports = userController