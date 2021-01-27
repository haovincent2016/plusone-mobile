const Router = require('koa-router');
const collectionController = require('../controller/collection')

const router = new Router({
    prefix: '/collection'
});

router.post('/getCollectionsByOwner', collectionController.getCollectionsByOwner)

module.exports = router;