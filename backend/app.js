//已完善：token过期和刷新
//https://www.jianshu.com/p/d1a3fb71eb99

const koa = require('koa')
const app = new koa()
const logger = require('koa-logger')
  , json = require('koa-json')
  , onerror = require('koa-onerror')
  , koajwt = require('koa-jwt')
  , koacors = require('koa2-cors')
  , koastatic = require('koa-static')
  , convert = require('koa-convert')

  //引入db配置
  const db = require('./config/db')
  
  //引入sequelize对象
  const sequelize = db.sequelize

//引入初始数据
const initialData = require('./utils/initial') 

//引入routes
const users = require('./routes/users')
const articles = require('./routes/article')
const collections = require('./routes/collection')
const tasks = require('./routes/task')
const downloads = require('./routes/download')
const admins = require('./routes/admin')
const files = require('./routes/files')
const settings = require('./routes/setting')
const tests = require('./routes/test')

//引入数据表模型
const user = require('./model/user')
const collection = require('./model/collection')
const article = require('./model/article')
const task = require('./model/task')
const setting = require('./model/setting')
const test = require('./model/test')

// 引入middleware
const auth = require('./utils/auth')

// sequelize.drop().then(() => {
//   sequelize.sync().then(async() => {
//     await user.bulkCreate(initialData.usersData)
//     await collection.bulkCreate(initialData.collectionsData)
//     await article.create(initialData.articleData)
//     await task.bulkCreate(initialData.tasksData)
//   })
// })

// simple
user.sync()
collection.sync()
article.sync()
task.sync()
setting.sync()
test.sync()

// error handler
onerror(app)

// global middlewares
app.use(require('koa-bodyparser')())
app.use(json())
app.use(logger())
app.use(koacors())

// 打印请求详情
app.use(convert(function *(next){
  const start = new Date
  yield next
  const ms = new Date - start
  console.log(`${this.method} ${this.url} - ${ms}ms`)
}))

// 设置公共资源文件夹
app.use(convert(koastatic(__dirname + '/public')))

// routes definition
app.use(users.routes(), users.allowedMethods())
app.use(articles.routes(), articles.allowedMethods())
app.use(collections.routes(), collections.allowedMethods())
app.use(tasks.routes(), tasks.allowedMethods())
app.use(downloads.routes(), downloads.allowedMethods())
app.use(admins.routes(), admins.allowedMethods())
app.use(files.routes(), files.allowedMethods())
app.use(settings.routes(), settings.allowedMethods())
app.use(tests.routes(), tests.allowedMethods())

// 验证token
app.use(auth)

const secret = 'qweasd789456'

//koa jwt验证token
app.use(koajwt({
  secret: secret
}).unless({
  path: [/^\/user\/register/,/^\/user\/login/,/^\/admin\/adminLogin/]
}))

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

// logger
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if(err.status === 401){
      ctx.status = 401
      ctx.body = {
        code: '-2000',
        desc: '登陆过期，请重新登陆'
      }
    }else{
      throw err
    }
  })
})

module.exports = app
