const express = require('express');
const commentsRouter = express.Router();
const CommentsController = require('../controllers/commentsController');
const authenticateJWT = require('../middlewares/auth');
const commentsController = new CommentsController()

commentsRouter.get('/', commentsController.getComments);

commentsRouter.get('/:articleid', commentsController.getCommentsByArticleId);

commentsRouter.post('/article/:id', authenticateJWT, commentsController.postComments);

commentsRouter.put('/:id', authenticateJWT, commentsController.putComments);

commentsRouter.delete('/:id', authenticateJWT, commentsController.deleteComments);

module.exports = commentsRouter