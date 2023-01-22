const express = require('express');
const articlesRouter = express.Router();
const client = require('../client');
const ArticlesController = require('../controllers/articlesController');
const authenticateJWT = require('../middlewares/auth');
const articlesController = new ArticlesController();


//permet de consulter tout les articles
articlesRouter.get('/', articlesController.getAllArticles);
//permet de sélectionner un article par son id
articlesRouter.get('/:id', articlesController.getArticleById);
//permet de poster un article
articlesRouter.post('/', authenticateJWT, articlesController.postArticle);
//permet de modifier un article
articlesRouter.put('/:id', authenticateJWT, articlesController.putArticle);
//permet de supprimer un article
articlesRouter.delete('/:id', authenticateJWT, articlesController.deleteArticle);
//permet de supprimer un article et tout les commentaires associés
articlesRouter.delete('/:id/comments', authenticateJWT, articlesController.deleteArticleWithComments);

module.exports = articlesRouter