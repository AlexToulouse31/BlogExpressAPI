const { text } = require("express");
const articlesRouter = require("../routes/articlesRouter");
const ArticlesService = require("../services/articlesService");
const CommentsService = require("../services/commentsService");
const articlesService = new ArticlesService();
const commentsService = new CommentsService();

class ArticlesController {
    async getAllArticles(req, res) {
        try {
            const data = await articlesService.selectAllArticles();
            res.status(200).json({
                status: "Ok",
                message: "Success",
                data: data
            })
        }
        catch (err) {
            console.log(err.stack)
            res.status(500).json({
                status: "Fail",
                message: "Syntax error",
                data: null
            })
        }
    };

    async getArticleById(req, res) {
        const id = req.params.id;
        try {
            const data = await articlesService.selectArticleById(i);

            res.status(200).json({
                status: "Ok",
                message: "Success",
                data: data
            })
        }
        catch (err) {
            res.status(500).json({
                status: "Fail",
                message: "Syntax error",
                data: null
            })
        }
    };

    async postArticle(req, res) {
        const user_id = req.userId
        const { title, text } = req.body

        if (!title && !(typeof (title) == 'string')) {
            res.status(400).json({
                status: "Fail",
                message: "Missing title or incorrect type",
                data: null
            })
        }
        else if (!text && !(typeof (text) == 'string')) {
            res.status(400).json({
                status: "Fail",
                message: "Missing text",
                data: null
            })
        }

        else {
            try {
                const data = await articlesService.postArticle(title, text, user_id);

                res.status(201).json({
                    status: "Ok",
                    message: "Created",
                    data: data
                })
            }

            catch (err) {
                res.status(500).json({
                    status: "Fail",
                    message: "Syntax error",
                    data: null
                })
            }
        };
    }

    async putArticle(req, res) {
        const id = Number(req.params.id);
        const user_idLogged = req.userId;
        const { title, text } = req.body

        if (!title && !(typeof (title) == 'string')) {
            res.status(400).json({
                status: "Fail",
                message: "Missing title or incorrect type",
                    data: null
            })
        }
        else if (!text && !(typeof (text) == 'string')) {
            res.status(400).json({
                status: "Fail",
                message: "Missing text",
                    data: null
            })
        }
        else if (!id && !(typeof (id) == 'number')) {
            res.status(400).json({
                status: "Fail",
                message: "Missing id or incorrect type",
                    data: null
            })
        }
        else {
            const article = await articlesService.selectArticleById(id);
            if (!article) {
                res.status(400).json({
                    status: "Fail",
                    message: "Article id unknown",
                        data: null
                })
                return
            }
            else if (user_idLogged != article[0].user_id) {
                res.status(403).json({
                    status: "Fail",
                    message: "Unable to update - Wrong authorization",
                        data: null
                })
                return
            }

            try {
                const data = await articlesService.putArticle(id, title, text);
                res.status(200).json({
                    status: "Ok",
                    message: "Updated article",
                    data: data

                })
            }

            catch (err) {
                res.status(500).json({
                    status: "Fail",
                    message: "Syntax error",
                    data: null
                })
            }
        };
    }

    async deleteArticle(req, res) {
        const deleteId = req.params.id;
        const user_idLogged = req.userId

        if (!deleteId && !(typeof (deleteId) == 'number')) {
            res.status(400).json({
                status: "Fail",
                message: "Missing identifier or incorrect type",
                data: null
            })
        }

        else {
            const article = await articlesService.selectArticleById(deleteId);
            if (!article) {
                res.status(400).json({
                    status: "Fail",
                    message: "Article id unknown",
                    data: null
                })
                return
            }
            else if (user_idLogged != article[0].user_id) {
                res.status(403).json({
                    status: "Fail",
                    message: "Unable to delete - Wrong authorization",
                    data: null
                })
                return
            }

            try {
                const deletedArticle = await articlesService.deleteArticle(deleteId);
                res.status(200).json({
                    status: "Fail",
                    message: "Deleted",
                    data: deletedArticle
                })
            }

            catch (err) {
                res.status(500).json({
                    status: "Fail",
                    message: "Syntax error",
                    data: null
                })
            }
        };
    }

    async deleteArticleWithComments(req, res) {
        const deleteId = req.params.id;
        const user_idLogged = req.userId

        if (!deleteId && !(typeof (deleteId) == 'number')) {
            res.status(400).json({
                status: "Fail",
                message: "Missing identifier or incorrect type",
                    data: null
            })
        }

        else {
            const article = await articlesService.selectArticleById(deleteId);
            if (!article) {
                res.status(400).json({
                    status: "Fail",
                    message:"Article id unknown",
                        data: null
                })
                return
            }
            else if (user_idLogged != article[0].user_id) {
                res.status(403).json({
                    status: "Fail",
                    message:"Unable to update - Wrong authorization",
                        data: null
                })
                return
            }

            try {
                // delete des commentaires via articleId
                await commentsService.deleteCommentsByArticleId(deleteId);

                // delete de l'article via son id
                const deletedArticle = await articlesService.deleteArticle(deleteId);
                res.status(200).json({
                    status: "Fail",
                    message: "Deleted",
                        data: deletedArticle
                })
            }

            catch (err) {
                res.status(500).json({
                    status: "Fail",
                    message: "Syntax error",
                    data: null
                })
            }
        };
    }
}

module.exports = ArticlesController