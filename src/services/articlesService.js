const client = require("../client");


class ArticlesService {
    async selectAllArticles() {
        const data = await client.query('SELECT * FROM articles');
        if (data.rowCount) {
            return data.rows
        }
        return undefined
    }

    async selectAllArticlesById(id) {
        const data = await client.query('SELECT * FROM articles WHERE id = $1', [id]);
        if (data.rowCount) {
            return data.rows
        }
        return undefined
    }

    async postArticles(title, text, user_id) {
        const data = await client.query('INSERT INTO articles (title, text, user_id) VALUES ($1, $2, $3) returning *', [title, text, user_id]);
        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    }

    async putArticles(id, title, text) {
        const data = await client.query('UPDATE articles SET (title, text) = ($2, $3) WHERE id = $1 returning *', [id, title, text]);
        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    }

    async deleteArticles(id) {
        const data = await client.query('DELETE FROM articles WHERE id = $1 returning *', [id]);
        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    }
}

module.exports = ArticlesService