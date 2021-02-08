const Router = require('koa-router')
const taskController = require('../controller/task')
const multer = require('koa-multer')
const path = require('path')

//文件上传配置
const storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
//加载配置
const upload = multer({ storage: storage })
const router = new Router({
    prefix: '/task'
})
router.post('/uploadTask', upload.single('file'), async(ctx, next) => {
    
    return ctx.body = {
        code: '0',
        filename: ctx.req.file.filename,
        desc: '图片上传成功~'
    } 
})

router.post('/getTask', taskController.getTask)

router.post('/getWeekTasks', taskController.getWeekTasks)

router.post('/saveTask', taskController.saveTask)

router.post('/addPoints', taskController.addPoints)

module.exports = router