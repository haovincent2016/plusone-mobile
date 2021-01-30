const Router = require('koa-router');
const adminController = require('../controller/admin')

const router = new Router({
    prefix: '/admin'
})

router.post('/adminLogin', adminController.adminLogin)

router.post('/adminLogout', adminController.adminLogout)

router.post('/getUsers', adminController.getUsers)

router.post('/getAdminUsers', adminController.getAdminUsers)

module.exports = router