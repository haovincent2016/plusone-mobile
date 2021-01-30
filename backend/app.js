const koa = require('koa')
const app = new koa()
const logger = require('koa-logger')
  , json = require('koa-json')
  , onerror = require('koa-onerror')
  , koajwt = require('koa-jwt')
  , koacors = require('koa2-cors')
  , koastatic = require('koa-static')
  , convert = require('koa-convert')

// 引入middleware
const auth = require('./public/auth')

//引入routes
const users = require('./routes/users')
const articles = require('./routes/article')
const collections = require('./routes/collection')
const tasks = require('./routes/task')
const downloads = require('./routes/download')
const admins = require('./routes/admin')

//引入数据表模型
const user = require('./model/user')
const collection = require('./model/collection')
const article = require('./model/article')
const task = require('./model/task')

//自动创建表，并导入初始数据,导入数据需按顺序
// (测试数据正式环境需删除)
user.sync().then(() => {
      user.create({
        id: 1,
        type: 'admin',
        username: 'haovincent',
        password: '$2a$05$kaesAZ4tGEj4aMo/UIKSk.Xe78CnvUb0fN7dkeI9kVCU4FqE1jW5u',
        points: 233,
        nickname: '遨游',
        phone: '18639289962',
        description: '此人很懒，什么也没写'
      })
    })

collection.sync().then(() => {
      collection.create({
        id: 2,
        title: '我的收藏',
        description: '主要关于英语学习类文章',
        public: true,
        ownerId: 1
      })
    })

article.sync().then(() => {
    article.create({
      id: 1,
      authorId: 1,
      colId: 2,
      title: '三千字说废就废',
      userId: 1,
      content: '我最近在靠写历史稿吃饭，昨天写了一篇三千字的，其实稿费只有三十五元，不过因我文笔一般，愣是写了一个多小时。当我把它发给老板之后，很快就被打回来了',
      picture: '/static/img/bg2.png',
      status: true,
      view: 101,
      like: 3
    })
})
  
task.sync()

// error handler
onerror(app)

// global middlewares
app.use(require('koa-bodyparser')())
app.use(json())
app.use(logger())
app.use(koacors())

app.use(convert(function *(next){
  const start = new Date
  yield next
  const ms = new Date - start
  console.log(`${this.method} ${this.url} - ${ms}ms`)
}))

app.use(convert(koastatic(__dirname + '/public')))

// routes definition
app.use(users.routes(), users.allowedMethods())
app.use(articles.routes(), articles.allowedMethods())
app.use(collections.routes(), collections.allowedMethods())
app.use(tasks.routes(), tasks.allowedMethods())
app.use(downloads.routes(), downloads.allowedMethods())
app.use(admins.routes(), admins.allowedMethods())

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

// 验证token
app.use(auth)

const secret = 'qweasd789456'

app.use(koajwt({
  secret: secret
}).unless({
  path: [/^\/user\/register/,/^\/user\/login/,/^\/admin\/adminLogin/]
}))

module.exports = app
