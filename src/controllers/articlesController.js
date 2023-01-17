
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
            const data = await articlesService.selectAllArticlesById(id);

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
        try {
            const { title, text, user_id } = req.body
            const data = await articlesService.postArticles(title, text);

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

    async putArticles(req, res) {
        const id = Number(req.params.id);
        const { title, text, user_id } = req.body
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

    async deleteArticles(req, res) {
        const id = req.params.id;
        const userId = req.userId
        try {
            const data = await articlesService.deleteArticles(id);
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
    }
};


module.exports = ArticlesController