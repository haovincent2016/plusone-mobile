//引入model
const test = require('../model/test')
const user = require('../model/user')

class testController {
  static async getAllTests(ctx) {
    try {
      const req = ctx.request.body
      const tests = await test.findAll()
      return ctx.body = {
        code: '0',
        content: JSON.stringify(tests),
        desc: '获取成功'
      }
    } catch(error) {
      console.log(error)
      return ctx.body = {
        code: '-1',
        desc: '获取失败'
      }
    }
  }

  static async getUserTests(ctx) {
    try {
      const req = ctx.request.body
      const u = await user.findByPk(req.id)
      const ts = await u.getTests()
      return ctx.body = {
        code: '0',
        content: JSON.stringify(ts),
        desc: '获取成功'
      }
    } catch(error) {
      console.log(error)
      return ctx.body = {
        code: '-1',
        desc: '获取失败'
      }
    }
  }

  static async getTest(ctx) {
    try {
      const req = ctx.request.body
      const t = await test.findByPk(req.id)
      const ts = await t.getUsers()
      return ctx.body = {
        code: '0',
        detail: JSON.stringify(t),
        testers: JSON.stringify(ts),
        desc: '获取成功'
      }
    } catch(error) {
      console.log(error)
      return ctx.body = {
        code: '-1',
        desc: '获取失败'
      }
    }
  }

  static async createTest(ctx) {
    try {
      const req = ctx.request.body
      const title = req.title
      const deadline = req.deadline
      const questions = req.questions
      const testItem = await test.create({
        title,
        deadline,
        questions
      })
      //userId允许多个，为数组
      const userId = req.userId
      await testItem.addUsers(userId)
      
      return ctx.body = {
        code: '0',
        desc: '创建成功'
      }
    } catch(error) {
      console.log(error)
      return ctx.body = {
        code: '-1',
        desc: '创建失败'
      }
    }
  }

  static async editTest(ctx) {
    try {
      const req = ctx.request.body
      const id = req.id
      const title = req.title
      const deadline = req.deadline
      const questions = req.questions
      await test.update({
        title,
        deadline,
        questions
      }, {
        where: {
          id
        }
      })
      const testItem = await test.findByPk(id)
      //userId允许多个，为数组
      const userId = req.userId
      await testItem.setUsers(userId)

      return ctx.body = {
        code: '0',
        desc: '修改成功'
      }
    } catch(error) {
      console.log(error)
      return ctx.body = {
        code: '-1',
        desc: '修改失败'
      }
    }
  }

  static async deleteTest(ctx) {
    try {
      const req = ctx.request.body
      await test.destroy({
        where: {
          id: req.id
        }
      })
      return ctx.body = {
        code: '0',
        desc: '删除成功'
      }
    } catch(error) {
      console.log(error)
      return ctx.body = {
        code: '-1',
        desc: '删除失败'
      }
    }
  }

  static async batchDeleteTests(ctx) {
    try {
      const req = ctx.request.body
      await user.destroy({
        where: {
          id: {
            [Op.in]: req.ids
          }
        }
      })
      return ctx.body = {
        code: '0',
        desc: '批量删除成功'
      }
    } catch(error) {
      console.log(error)
      return ctx.body = {
        code: '-1',
        desc: '批量删除失败'
      }
    }
  }
}

module.exports = testController