const express = require('express');
const articlesRouter = express.Router();
const client = require('../client');
const ArticlesController = require('../controllers/articlesController');
const authenticateJWT = require('../middlewares/auth');
const articlesController = new ArticlesController()

articlesRouter.get('/', articlesController.getArticles);

articlesRouter.get('/:id', articlesController.getArticleById);

articlesRouter.post('/', authenticateJWT, articlesController.postArticles);

articlesRouter.put('/:id', authenticateJWT, articlesController.putArticles);

articlesRouter.delete('/:id', authenticateJWT, articlesController.deleteArticles);

module.exports = articlesRouter