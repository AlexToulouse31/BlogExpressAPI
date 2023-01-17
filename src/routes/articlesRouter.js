const express = require('express');
const articlesRouter = express.Router();
const client = require('../client');
const ArticlesController = require('../controllers/articlesController');
const authenticateJWT = require('../middlewares/auth');
const articlesController = new ArticlesController()

articlesRouter.get('/', /*authenticateJWT,*/ articlesController.getArticles);

articlesRouter.get('/:id', /*authenticateJWT,*/articlesController.getArticleById);

articlesRouter.post('/', /*authenticateJWT,*/ articlesController.postArticles);

articlesRouter.put('/:id', /*authenticateJWT, */ articlesController.putArticles);

/*articlesRouter.delete('/:id', authenticateJWT, async (req, res) => {
    const id = req.params.id;
    const userId = req.userId

    try {
        const data = await client.query('DELETE FROM tickets WHERE id = $1', [id]);

        res.status(200).json({
            status: "deleted",
            data: data.rows
        })
    }

    catch (err) {
        res.status(404).json({
            status: "not found",
            data: null
        })
    }
}); */

module.exports = articlesRouter