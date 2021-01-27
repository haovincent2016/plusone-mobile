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
        }] 
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
      const articles = await article.findAll({
        where: {
          authorId: req.author
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
      const articles = await article.findAll({
        where: {
          colId: req.collection
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
}

module.exports = articleController