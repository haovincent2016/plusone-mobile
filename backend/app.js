const koa = require('koa');
const app = new koa();
const logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror')
  , koajwt = require('koa-jwt')
  , koacors = require('koa2-cors')
  , koastatic = require('koa-static')
  , convert = require('koa-convert');


//const index = require('./routes/index');
const users = require('./routes/users');

// error handler
onerror(app);

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'jade'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
app.use(koacors());

app.use(convert(function *(next){
  const start = new Date;
  yield next;
  const ms = new Date - start;
  console.log(`${this.method} ${this.url} - ${ms}ms`);
}));

app.use(convert(koastatic(__dirname + '/public')));

// routes definition
//app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});



// logger
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if(err.status === 401){
      ctx.status = 401;
      ctx.body = {
        code: '-2000',
        desc: '登陆过期，请重新登陆'
      };
    }else{
      throw err;
    }
  })
})

app.use(koajwt({
  secret: 'qweasd789456'
}).unless({
  path: [/^\/user\/register/,/^\/user\/login/]
}))

module.exports = app;
