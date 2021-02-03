const Router = require('koa-router')
const adminController = require('../controller/admin')
const multer = require('koa-multer')
const path = require('path')

const router = new Router({
    prefix: '/admin'
})

//文件上传配置
const storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/articles/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
//加载配置
const upload = multer({ storage: storage })
//文章顶部单图上传
router.post('/uploadSingle', upload.single('image'), async(ctx, next) => {
    return ctx.body = {
        code: '0',
        filename: ctx.req.file.filename,
        desc: '文章图片上传成功~'
    } 
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

//获得指定文章
router.post('/getArticle', adminController.getArticle)

//添加文章
router.post('/createArticle', adminController.createArticle)

//编辑文章
router.post('/editArticle', adminController.editArticle)

//删除文章
router.post('/deleteArticle', adminController.deleteArticle)

//删除文章
router.post('/batchDeleteArticles', adminController.batchDeleteArticles)

module.exports = router