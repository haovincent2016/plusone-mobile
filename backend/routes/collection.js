const Router = require('koa-router');
const collectionController = require('../controller/collection')

const router = new Router({
    prefix: '/collection'
});

router.post('/getCollectionsByOwner', collectionController.getCollectionsByOwner)

router.post('/createCollection', collectionController.createCollection)

router.post('/addToCollection', collectionController.addToCollection)

router.post('/deleteFromCollection', collectionController.deleteFromCollection)

router.post('/editCollection', collectionController.editCollection)

module.exports = router;