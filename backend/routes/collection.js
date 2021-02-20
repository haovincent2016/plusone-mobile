const Router = require('koa-router');
const collectionController = require('../controller/collection')

const router = new Router({
    prefix: '/collection'
});

router.post('/getCollectionsByOwner', collectionController.getCollectionsByOwner)

router.post('/createCollection', collectionController.createCollection)

router.post('/addToCollection', collectionController.addToCollection)

router.post('/collectionHasArticle', collectionController.collectionHasArticle)

router.post('/deleteFromCollection', collectionController.deleteFromCollection)

router.post('/clearCollection', collectionController.clearCollection)

router.post('/editCollection', collectionController.editCollection)

router.post('/deleteCollection', collectionController.deleteCollection)

module.exports = router;