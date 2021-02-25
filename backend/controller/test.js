//引入model
const test = require('../model/test')

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

  static async getTest(ctx) {
    try {
      const req = ctx.request.body
      const detail = await test.findByPk(req.id)
      return ctx.body = {
        code: '0',
        content: JSON.stringify(detail),
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
      const id = ctx.params.id
      const title = req.title 
      const content = req.content
      await test.update({
        title,
        content
      }, {
        where: {
          id
        }
      })
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
}

module.exports = testController