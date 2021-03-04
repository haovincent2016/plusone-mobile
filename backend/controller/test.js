//引入model
const test = require('../model/test')
const user = require('../model/user')

//应区分题目接口及答案接口，答案接口一般不返回
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

  // 获取特指考试数据（包括考生及答案）
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

  // 考生获取特指试卷（不包括考生及答案）
  static async getUserTest(ctx) {
    try {
      const req = ctx.request.body
      const id = req.id
      // 获取考试数据（去掉答案）
      const t = await test.findByPk(req.id)
      t.questions = JSON.parse(t.questions).map(i => {
        return {
          id: i.id,
          typeId: i.typeId,
          title: i.title,
          score: i.score,
          answer: [],
          content: i.content
        }
      })
      return ctx.body = {
        code: '0',
        detail: JSON.stringify(t),
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

  // 计算分数（仅包括选择和判断）
  static async calScore(ctx) {
    try {
      const req = ctx.request.body
      const id = req.id
      // 考生答案，格式为[{ id: id, typeId: typeId, score: score, answer: answer }]
      const answers = req.answers
      // 找到测试题
      const t = await test.findByPk(id)
      // 重新赋值问题内容
      t.questions = JSON.parse(t.questions).map(i => {
        return {
          id: i.id,
          typeId: i.typeId,
          score: i.score,
          answer: i.answer
        }
      })
      // 分类计算分数
      // 多选题错一个不得分，简答和填空需人工给分
      let total = 0
      answers.forEach(a => {
        // 找匹配题目id
        let q = t.questions.find(i => { return i.id == a.id })
        if(JSON.stringify(q.answer) === JSON.stringify(a.answer)) {
          total += Number(q.score)
        }
      })

      return ctx.body = {
        code: '0',
        score: total
      }
    } catch(error) {
      console.log(error)
      return ctx.body = {
        code: '-1',
        desc: '分数计算失败，请重试~'
      }
    }
  }
}

module.exports = testController