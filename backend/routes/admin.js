const Router = require('koa-router');
const adminController = require('../controller/admin')

const router = new Router({
    prefix: '/admin'
})

router.post('/adminLogin', adminController.adminLogin)

router.post('/adminLogout', adminController.adminLogout)

//刷新token
router.post('/refreshToken',adminController.refreshToken)

//获取所有用户
router.post('/getUsers', adminController.getUsers)

//获取所有管理员
router.post('/getAdminUsers', adminController.getAdminUsers)

//添加用户
router.post('/createUser', adminController.createUser)

//编辑用户
router.post('/editUser', adminController.editUser)

//删除用户
router.post('/deleteUser', adminController.deleteUser)

//删除用户
router.post('/batchDeleteUsers', adminController.batchDeleteUsers)

module.exports = router