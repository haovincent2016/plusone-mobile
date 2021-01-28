const Router = require('koa-router')
const send = require('koa-send')

const router = new Router({
    prefix: '/download'
})

router.get('/:name', async (ctx) => {
    const name = ctx.params.name
    const path = `/public/downloads/${name}`
    ctx.attachment(path)
    await send(ctx, path)
})

module.exports = router;