const Router = require('koa-router');
const articleController = require('../controller/article')

const router = new Router({
    prefix: '/article'
});

router.post('/getArticles', articleController.getArticles)

router.post('/getArticlesByAuthor', articleController.getArticlesByAuthor)

router.post('/getArticlesByCollection', articleController.getArticlesByCollection)

module.exports = router;
