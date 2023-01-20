const express = require('express');
const commentsRouter = express.Router();
const CommentsController = require('../controllers/commentsController');
const authenticateJWT = require('../middlewares/auth');
const commentsController = new CommentsController();


//permet de consulter tout les commentaires
commentsRouter.get('/', commentsController.getAllComments);
//permet de sélectionner un commentaire par son id
commentsRouter.get('/:articleid', commentsController.getCommentsByArticleId);
//permet de poster un commentaire
commentsRouter.post('/article/:id', authenticateJWT, commentsController.postComment);
//permet de modifier un commentaire
commentsRouter.put('/:id', authenticateJWT, commentsController.putComment);
//permet de supprimer un commentaire
commentsRouter.delete('/:id', authenticateJWT, commentsController.deleteComment);
// permet de supprimer tous les commentaires d'un article
commentsRouter.delete('/:id', authenticateJWT, commentsController.deleteCommentsByArticleId);


module.exports = commentsRouter