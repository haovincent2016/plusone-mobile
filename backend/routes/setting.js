const Router = require('koa-router')
const settingController = require('../controller/setting')

// const router = new Router({
//     prefix: '/setting'
// })
const router = new Router()

router.post('/setting/all', settingController.getAllSettings)

router.post('/setting/:id', settingController.getSetting)

router.post('/setting/create', settingController.createSetting)

router.post('/setting/edit/:id', settingController.editSetting)

router.post('/setting/delete', settingController.deleteSetting)

module.exports = router