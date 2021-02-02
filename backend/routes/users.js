const Router = require('koa-router')
const userController = require('../controller/user')

const router = new Router({
    prefix: '/user'
})

//检测用户名
router.post('/testName',userController.testName)

//用户注册
router.post('/register',userController.create)

//密码登陆
router.post('/login',userController.login)

//获取用户信息
router.post('/getUserInfo',userController.getUserInfo)

//刷新token
router.post('/refreshToken',userController.refreshToken)

module.exports = router
