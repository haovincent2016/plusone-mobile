const { sequelize } = require('../config/db')
const article = require('../model/article')
const user = require('../model/user')

class articleController {
  // 所有文章
  static async getArticles(ctx) {
    try {
      const req = ctx.request.body
      const articles = await article.findAll({
        include:[{
          model: user,
          attributes:['username','avatar']
        }],
        limit: Number(req.limit) || 5,
        order: [
          ['view', 'DESC']
        ] 
      })
      return ctx.body = {
        code: '0',
        desc: '获取文章成功',
        articles: JSON.stringify(articles)
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '获取文章失败'
      }
    }
  }

  // 根据作者找文章(author)
  static async getArticlesByAuthor(ctx) {
    try {
      const req = ctx.request.body
      const authorId = req.author
      const articles = await article.findAll({
        where: {
          authorId
        }
      })
      return ctx.body = {
        code: '0',
        desc: '获取文章成功',
        articles: JSON.stringify(articles)
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '获取文章失败'
      }
    }
  }

  // 根据收藏夹找文章(collection)
  static async getArticlesByCollection(ctx) {
    try {
      const req = ctx.request.body
      const colId = req.collection
      const articles = await article.findAll({
        where: {
          colId
        }
      })
      return ctx.body = {
        code: '0',
        desc: '获取文章成功',
        articles: JSON.stringify(articles)
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '获取文章失败'
      }
    }
  }

  // 根据id找文章
  static async getArticleById(ctx) {
    try {
      const req = ctx.request.body
      const id = req.id
      const detail = await article.findOne({
        where: {
          id
        },
        include:[{
          model: user,
          attributes:['username','avatar']
        }]
      })
      return ctx.body = {
        code: '0',
        desc: '获取文章成功',
        detail: JSON.stringify(detail)
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '获取文章失败'
      }
    }
  }
}

module.exports = articleController