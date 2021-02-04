const { sequelize } = require('../config/db')
const task = require('../model/task')
const user = require('../model/user')

class taskController {
  //获取用户当日打卡
  static async getTask(ctx) {
    try {
      const req = ctx.request.body
      const detail = await task.findAll({
        where: {
          [Op.and]: [
            { userId: req.userId },
            sequelize.where(sequelize.fn('DATE', sequelize.col('createdAt')),{
              [Op.eq]: new Date()
            })
          ]
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