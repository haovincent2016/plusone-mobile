//引入model
const setting = require('../model/setting')

class settingController {
  static async getAllSettings(ctx) {
    try {
      const req = ctx.request.body
      const settings = await setting.findAll()
      return ctx.body = {
        code: '0',
        content: JSON.stringify(settings),
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
  static async getSetting(ctx) {
    try {
      const req = ctx.request.body
      const detail = await setting.findByPk(req.id)
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
  static async createSetting(ctx) {
    try {
      const req = ctx.request.body
      await setting.create(req)
      return ctx.body = {
        code: '0',
        desc: '设置创建成功'
      }
    } catch(error) {
      console.log(error)
      return ctx.body = {
        code: '-1',
        desc: '设置创建失败'
      }
    }
  }
  static async editSetting(ctx) {
    try {
      const req = ctx.request.body
      const id = ctx.params.id
      const title = req.title 
      const content = req.content
      await setting.update({
        title,
        content
      }, {
        where: {
          id
        }
      })
      return ctx.body = {
        code: '0',
        desc: '设置修改成功'
      }
    } catch(error) {
      console.log(error)
      return ctx.body = {
        code: '-1',
        desc: '设置修改失败'
      }
    }
  }
  static async deleteSetting(ctx) {
    try {
      const req = ctx.request.body
      await setting.destroy({
        where: {
          id: req.id
        }
      })
      return ctx.body = {
        code: '0',
        desc: '设置删除成功'
      }
    } catch(error) {
      console.log(error)
      return ctx.body = {
        code: '-1',
        desc: '设置删除失败'
      }
    }
  }
}

module.exports = settingController