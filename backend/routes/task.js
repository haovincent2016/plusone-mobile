const Router = require('koa-router');
const taskController = require('../controller/task')
const multer = require('koa-multer')

//文件上传配置
const storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        const fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
const upload = multer({ storage: storage });
const router = new Router({
    prefix: '/task'
});
router.post('/uploadTask', upload.single('pic'), async (ctx, next) => {
    return ctx.body = {
        code: '0',
        filename: 'http://localhost:4000/uploads/'+ctx.req.file.filename,
        desc: '图片上传成功~'
    }
})

module.exports = router