const Router = require('koa-router');
const articleController = require('../controller/article')

const router = new Router({
    prefix: '/article'
});

router.post('/getArticles', articleController.getArticles)

router.post('/getArticlesByAuthor', articleController.getArticlesByAuthor)

router.post('/getArticlesByCollection', articleController.getArticlesByCollection)

router.post('/getArticleById', articleController.getArticleById)

router.post('/likeArticle', articleController.likeArticle)

router.post('/viewArticle', articleController.viewArticle)

module.exports = router;
