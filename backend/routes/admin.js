const Router = require('koa-router');
const adminController = require('../controller/admin')

const router = new Router({
    prefix: '/admin'
})

router.post('/adminLogin', adminController.adminLogin)

router.post('/adminLogout', adminController.adminLogout)

//刷新token
router.post('/refreshToken',adminController.refreshToken)

//用户管理
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

//文章管理
//获取所有文章
router.post('/getArticles', adminController.getArticles)

//添加文章
router.post('/createArticle', adminController.createArticle)

//编辑文章
router.post('/editArticle', adminController.editArticle)

//删除文章
router.post('/deleteArticle', adminController.deleteArticle)

//删除文章
router.post('/batchDeleteArticles', adminController.batchDeleteArticles)

module.exports = router