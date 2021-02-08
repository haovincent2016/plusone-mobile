const Router = require('koa-router')
const filesController = require('../controller/files')

const router = new Router()

// 静态资源服务器
router.post('/public/downloads', filesController.getFiles)

module.exports = router