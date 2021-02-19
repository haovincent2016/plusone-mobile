const Router = require('koa-router')
const filesController = require('../controller/files')

const router = new Router()

// 静态资源服务器
// 一级资源文件夹
router.post('/public', filesController.getAllFiles)
// 二级资源文件夹
router.post('/public/:directory', filesController.getFiles)

module.exports = router