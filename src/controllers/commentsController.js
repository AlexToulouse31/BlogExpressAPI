const { message } = require("express");
const commentsRouter = require("../routes/commentsRouter");
const ArticlesService = require("../services/articlesService");
const CommentsService = require("../services/commentsService");

const commentsService = new CommentsService();
const articlesService= new ArticlesService();

class CommentsController {
    async getAllComments(req, res) {
        try {
            const data = await commentsService.selectAllComments();

            res.status(200).json({
                status: "success",
                message: "succes",
                data: data
            })
        }
        catch (err) {
            console.log(err.stack);

            res.status(500).json({
                status: "fail",
                message: "erreur de syntaxe",
                data: null
            })
        }
    };

    async getCommentsByArticleId(req, res) {
        const article_id = req.params.article_id;
        try {
            const data = await commentsService.selectCommentsByArticleId(article_id);

            if (!data) {
                res.status(200).json({
                    status: "success",
                    data: data
                })
            }
            else {
                res.status(400).json({
                    status: "Article Id inconnu",
                    data: null
                })
            }
        }
        catch (err) {
            res.status(500).json({
                status: "Erreur serveur ou inconnue",
                data: null
            })
        }
    };

    async postComment(req, res) {
        const user_id = req.userId
        const article_id = req.params.id
        const message = req.body.message

        if (!message && !(typeof (message) == 'string')) {
            res.status(400).json({
                status: "Missing message or incorrect type",
                data: null
            })
        }
        else if (!article_id && !(typeof (article_id) == 'number')) {
            res.status(400).json({
                status: "Missing article or incorrect type",
                data: null
            })
        }

        else {
            try {
                const data = await commentsService.postComment(message, article_id, user_id);

                res.status(201).json({
                    status: "comments created",
                    data: data
                })
            }

            catch (err) {
                res.status(500).json({
                    status: "fail",
                    message: "erreur de syntaxe",
                    data: null
                })
            }
        };
    }

    async putComment(req, res) {
        const id = Number(req.params.id);
        const user_idLogged = req.userId;
        const message = req.body.message

        if (!message && !(typeof (message) == 'string')) {
            res.status(400).json({
                status: "Missing message or incorrect type",
                data: null
            })
        }

        else if (!id && !(typeof (id) == 'number')) {
            res.status(400).json({
                status: "Missing article id or incorrect type",
                data: null
            })
        }

        else {
            const comment = await commentsService.selectCommentById(id);
            if (!comment) {
                res.status(400).json({
                    status: "Comment id unknown",
                    data: null
                })
                return
            }
            else if (user_idLogged != comment.user_id) {
                res.status(403).json({
                    status: "Updated impossible - Bad Authorization",
                    data: null
                })
                return
            }

            try {
                const data = await commentsService.putComment(id, message);
                res.status(200).json({
                    status: "success",
                    message: "comment updated",
                    data: data

                })
            }

            catch (err) {
                res.status(500).json({
                    status: "fail",
                    message: "erreur de syntaxe",
                    data: null
                })
            }
        };
    }

    async deleteComment(req, res) {
        const deleteId = req.params.id;
        const user_idLogged = req.userId

        if (!deleteId && !(typeof (deleteId) == 'number')) {
            res.status(400).json({
                status: "Missing id or incorrect type",
                data: null
            })
        }

        else {
            const comment = await commentsService.selectCommentById(deleteId);
            if (!comment) {
                res.status(400).json({
                    status: "Comment id unknown",
                    data: null
                })
                return
            }
            else if (user_idLogged != comment.user_id) {
                res.status(403).json({
                    status: "Delete impossible - Bad Authorization",
                    data: null
                })
                return
            }

            try {

                const data = await commentsService.deleteComment(deleteId);
                res.status(200).json({
                    status: "deleted",
                    data: data
                })
            }

            catch (err) {
                res.status(500).json({
                    status: "fail",
                    message: "erreur de syntaxe",
                    data: null
                })
            }
        };
    }

    async deleteCommentsByArticleId(req, res) {
        const articleId = req.params.id;
        const user_idLogged = req.userId

        if (!articleId && !(typeof (articleId) == 'number')) {
            res.status(400).json({
                status: "Missing id or incorrect type",
                data: null
            })
        }

        else {
            const article = await articlesService.selectArticleById(articleId);
            if (!article) {
                res.status(400).json({
                    status: "Article id unknown",
                    data: null
                })
                return
            }
            else if (user_idLogged != article.user_id) {
                res.status(403).json({
                    status: "Delete impossible - Bad Authorization",
                    data: null
                })
                return
            }

            try {

                const data = await commentsService.deleteCommentsByArticleId(deleteId);
                res.status(200).json({
                    status: "deleted",
                    data: data
                })
            }

            catch (err) {
                res.status(500).json({
                    status: "fail",
                    message: "erreur de syntaxe",
                    data: null
                })
            }
        };
    }
}

module.exports = CommentsController