
const { text } = require("express");
const articlesRouter = require("../routes/articlesRouter");
const ArticlesService = require("../services/articlesService");
const articlesService = new ArticlesService();


class ArticlesController {
    async getArticles(req, res) {
        try {
            const data = await articlesService.selectAllArticles();
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

    async getArticleById(req, res) {
        const id = req.params.id;
        try {
            const data = await articlesService.selectArticleById(i);

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

    async postArticles(req, res) {
        const user_id = req.userId
        const { title, text } = req.body

        if (!title && !(typeof(title) == 'string')) {
            res.status(400).json({
                status: "Missing title or incorrect type",
                data: null
            })
        }
        else if (!text && !(typeof(text) == 'string')) {
            res.status(400).json({
                status: "Missing text",
                data: null
            })
        }

        else {
            try {
                const data = await articlesService.postArticles(title, text, user_id);

                res.status(201).json({
                    status: "created",
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

    async putArticles(req, res) {
        const id = Number(req.params.id);
        const user_idLogged = req.userId;
        const { title, text} = req.body

        if (!title && !(typeof(title) == 'string')) {
            res.status(400).json({
                status: "Missing title or incorrect type",
                data: null
            })
        }
        else if (!text && !(typeof(text) == 'string')) {
            res.status(400).json({
                status: "Missing text",
                data: null
            })
        }
        else if (!id && !(typeof(id) == 'number')) {
                res.status(400).json({
                    status: "Missing id or incorrect type",
                    data: null
                })
            }
        else {
            const article = await articlesService.selectArticleById(id);
            if (!article) {
                res.status(400).json({
                    status: "Article id unknown",
                    data: null
                })
                return
            }
            else if (user_idLogged != article[0].user_id) {
                res.status(403).json({
                    status: "Updated impossible - Bad Authorization",
                    data: null
                })
                return
            }

            try {
                const data = await articlesService.putArticles(id, title, text);
                res.status(200).json({
                    status: "success",
                    message: "article updated",
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
    async deleteArticles(req, res) {
        const deleteId = req.params.id;
        const user_idLogged = req.userId

        if (!id && !(typeof(id) == 'number')) {
            res.status(400).json({
                status: "Missing id or incorrect type",
                data: null
            })
        }

        else {
            try {
                const data = await articlesService.deleteArticles(deleteId);
                res.status(200).json({
                    status: "deleted",
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
}

module.exports = ArticlesController