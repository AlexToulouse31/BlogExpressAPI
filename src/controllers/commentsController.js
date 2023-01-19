const { message } = require("express");
const commentsRouter = require("../routes/commentsRouter");
const CommentsService = require("../services/commentsService");
const commentsService = new CommentsService();

class CommentsController {
    async getComments(req, res) {
        try {
            const data = await commentsService.selectAllComments();
            res.status(200).json({
                status: "success",
                message: "succes",
                data: data
            })
        }
        catch (err) {
            console.log(err.stack)
            res.status(400).json({
                status: "fail",
                message: "erreur de syntaxe",
                data: null
            })
        }
    };

    async getCommentsByArticleId(req, res) {
        const article_id = req.params.article_id;
        try {
            const data = await commentsService.selectCommentsByArticleId(i);

            res.status(200).json({
                status: "success",
                data: data
            })
        }
        catch (err) {
            res.status(404).json({
                status: "not found",
                data: null
            })
        }
    };

    async postComments(req, res) {
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
                const data = await commentsService.postComments(message, article_id, user_id);

                res.status(201).json({
                    status: "comments created",
                    data: data
                })
            }

            catch (err) {
                res.status(404).json({
                    status: "not found",
                    data: null
                })
            }
        };
    }

    async putComments(req, res) {
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
                const data = await commentsService.putComments(id, message);
                res.status(200).json({
                    status: "success",
                    message: "comment updated",
                    data: data

                })
            }

            catch (err) {
                res.status(404).json({
                    status: "not found",
                    data: null
                })
            }
        };
    }

    async deleteComments(req, res) {
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
                    status: "Updated impossible - Bad Authorization",
                    data: null
                })
                return
            }

            try {
                const data = await commentsService.deleteComments(deleteId);
                res.status(200).json({
                    status: "deleted",
                    data: data
                })
            }

            catch (err) {
                res.status(500).json({
                    status: "not found",
                    data: null
                })
            }
        };
    }
}

module.exports = CommentsController