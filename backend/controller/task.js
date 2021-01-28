const task = require('../model/task')

class taskController {
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