const Router = require('koa-router')
const testController = require('../controller/test')

// const router = new Router({
//     prefix: '/test'
// })
const router = new Router()

router.post('/test/all', testController.getAllTests)

router.post('/test/item', testController.getTest)

router.post('/test/create', testController.createTest)

router.post('/test/edit/:id', testController.editTest)

router.post('/test/delete', testController.deleteTest)

module.exports = router