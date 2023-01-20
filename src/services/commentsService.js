const client = require("../client");

class CommentsService {
    async selectAllComments() {
        const data = await client.query('SELECT * FROM comments');
        if (data.rowCount) {
            return data.rows
        }
        return undefined
    }

    async selectCommentById(id) {
        const comment = await client.query('SELECT * FROM comments WHERE id = $1', [id]);
        if (comment.rowCount) {
            return comment.rows[0]
        }
        return undefined
    }

    async selectCommentsArticleById(id) {
        const data = await client.query('SELECT * FROM comments WHERE id = $1', [id]);
        if (data.rowCount) {
            return data.rows
        }
        return undefined
    }

    async postComment(message, article_id, user_id) {
        const data = await client.query('INSERT INTO comments (message, article_id, user_id) VALUES ($1, $2, $3) returning *', [message, article_id, user_id]);
        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    }

    async putComment(id, message) {
        const data = await client.query('UPDATE comments SET message = $2 WHERE id = $1 returning *', [id, message]);
        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    }

    async deleteComment(id) {
        const data = await client.query('DELETE FROM comments WHERE id = $1 returning *', [id]);
        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    }

    async deleteCommentsByArticleId(id) {
        const data = await client.query('DELETE FROM comments WHERE article_id = $1 returning *', [id]);
        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    }
}

module.exports = CommentsService