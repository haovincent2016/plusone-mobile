const collection = require('../model/collection')

class collectionController {
  // 根据用户找收藏夹(author)
  static async getCollectionsByOwner(ctx) {
    try {
      const req = ctx.request.body
      const collections = await collection.findAll({
        where: {
          ownerId: req.author
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
}

module.exports = collectionController