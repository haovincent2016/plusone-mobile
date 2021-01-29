const Router = require('koa-router');
const adminController = require('../controller/admin')

const router = new Router({
    prefix: '/admin'
});

router.post('/getUsers', adminController.getUsers)

module.exports = router