const { sequelize } = require('../config/db')
const task = require('../model/task')
const user = require('../model/user')

//引入Op
const { Op } = require("sequelize")

class taskController {
  //获取用户当日打卡
  static async getTask(ctx) {
    try {
      const req = ctx.request.body
      const START = new Date().setHours(0,0,0,0)
      const END = new Date().setHours(23,59,59,59)
      const detail = await task.findAll({
        where: {
          userId: req.userId,
          createdAt: {
            [Op.gt]: START,
            [Op.lt]: END
          }
        }
      })
      return ctx.body = {
        code: '0',
        detail: detail,
        desc: '打卡数据查询成功'
      }
    } catch(err) {
      return ctx.body = {
        code: '-1',
        desc: '打卡数据查询失败'
      }
    }
  }
  //保存打卡
  static async saveTask(ctx) {
    try {
      const req = ctx.request.body
      await task.create({
        taskImages: req.taskImages,
        finishWrite: req.finishWrite,
        finishVideo: req.finishVideo,
        userId: req.userId
      })
      return ctx.body = {
        code: '0',
        desc: '打卡成功~'
      }
    } catch(err) {
      return ctx.body = {
        code: '-1',
        desc: '打卡失败，请重试'
      }
    }
  }
}

module.exports = taskController