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
        desc: '获取收藏夹成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '获取收藏夹失败'
      }
    }
  }

  // 新建收藏夹
  static async createCollection(ctx) {
    try {
      const req = ctx.request.body
      const collection = await collection.create({
      })
      return ctx.body = {
        code: '0',
        collection: JSON.stringify(collection),
        desc: '新建收藏夹成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '新建收藏夹失败'
      }
    }
  }

  // 添加文章到收藏夹
  static async addToCollection(ctx) {
    try {
      const req = ctx.request.body
      const collection = await collection.create({
      })
      return ctx.body = {
        code: '0',
        collection: JSON.stringify(collection),
        desc: '新建收藏夹成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '新建收藏夹失败'
      }
    }
  }

  // 删除收藏夹中文章
  static async deleteFromCollection(ctx) {
    try {
      const req = ctx.request.body
      const collection = await collection.create({
      })
      return ctx.body = {
        code: '0',
        collection: JSON.stringify(collection),
        desc: '新建收藏夹成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '新建收藏夹失败'
      }
    }
  }

  // editCollection
  static async editCollection(ctx) {
    try {
      const req = ctx.request.body
      const collection = await collection.create({
      })
      return ctx.body = {
        code: '0',
        collection: JSON.stringify(collection),
        desc: '新建收藏夹成功'
      }
    } catch(error) {
      return ctx.body = {
        code: '-1',
        desc: '新建收藏夹失败'
      }
    }
  }
}

module.exports = collectionController