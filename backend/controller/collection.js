const collection = require('../model/collection')

class collectionController {
  // 根据用户找收藏夹(author)
  static async getCollectionsByOwner(ctx) {
    try {
      const req = ctx.request.body
      const ownerId = req.author
      const collections = await collection.findAll({
        where: {
          ownerId
        }
      })
      return ctx.body = {
        code: '0',
        collections: JSON.stringify(collections),
        desc: '获取成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '获取失败'
      }
    }
  }

  // 获取收藏夹中文章
  static async getArticleByCollection(ctx) {
    try {
      const req = ctx.request.body
      const articles = await collection.findAll({
        where: {
          id: req.id
        },
        include: [{
          model: article,
          attributes:['title','picture', 'view', 'like', 'createdAt']
        }]
      })
      return ctx.body = {
        code: '0',
        collections: JSON.stringify(collections),
        desc: '获取成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '获取失败'
      }
    }
  }

  // 新建收藏夹
  static async createCollection(ctx) {
    try {
      const req = ctx.request.body
      const title = req.title
      const description = req.description
      const isPublic = req.isPublic
      const ownerId = req.ownerId
      await collection.create({
        title: title,
        description: description,
        public: isPublic,
        ownerId: ownerId
      })
      return ctx.body = {
        code: '0',
        desc: '新建成功'
      }
    } catch(error) {
      console.log(error)
      return ctx.body = {
        code: '-1',
        desc: '新建失败'
      }
    }
  }

  // 添加文章到收藏夹
  static async addToCollection(ctx) {
    try {
      const req = ctx.request.body
      const artId = req.articleId
      const colId = req.collectionId
      const col = await collection.findByPk(colId)
      await col.addArticle(artId)
      return ctx.body = {
        code: '0',
        desc: '添加成功'
      }
    } catch(error) {
      console.log(error)
      return ctx.body = {
        code: '-1',
        desc: '添加失败'
      }
    }
  }

  // 收藏夹中是否有该文章
  static async collectionHasArticle(ctx) {
    try {
      const req = ctx.request.body
      const artId = req.articleId
      const colId = req.collectionId
      const col = await collection.findByPk(colId)
      const detail = await col.hasArticle(Number(artId))
      return ctx.body = {
        code: '0',
        detail: detail,
        desc: ''
      }
    } catch(error) {
      console.log(error)
      return ctx.body = {
        code: '-1',
        desc: ''
      }
    }
  }

  // 删除收藏夹中文章
  static async deleteFromCollection(ctx) {
    try {
      const req = ctx.request.body
      const artId = req.articleId
      const colId = req.collectionId
      const col = await collection.findByPk(colId)
      await col.removeArticle(artId)
      return ctx.body = {
        code: '0',
        desc: '删除成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '删除失败'
      }
    }
  }

  // 清空收藏夹
  static async clearCollection(ctx) {
    try {
      const req = ctx.request.body
      const colId = req.collectionId
      const col = await collection.findByPk(colId)
      const collection = await col.setArticles([])
      return ctx.body = {
        code: '0',
        collection: JSON.stringify(collection),
        desc: '已清空~'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '清空失败'
      }
    }
  }

  // 编辑收藏夹
  static async editCollection(ctx) {
    try {
      const req = ctx.request.body
      const collection = await collection.update(req.collectionForm, {
        where: {
          id: req.id
        }
      })
      return ctx.body = {
        code: '0',
        collection: JSON.stringify(collection),
        desc: '编辑成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '编辑失败'
      }
    }
  }

  // 删除收藏夹
  static async deleteCollection(ctx) {
    try {
      const req = ctx.request.body
      const collection = await collection.destroy({
        where: {
          id: req.id
        }
      })
      return ctx.body = {
        code: '0',
        collection: JSON.stringify(collection),
        desc: '删除成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '删除失败'
      }
    }
  }
}

module.exports = collectionController