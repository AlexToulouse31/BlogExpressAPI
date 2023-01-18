const client = require("../client");

class UsersService {
    async selectAllUsers() {
        const data = await client.query('SELECT * FROM users');
        if (data.rowCount) {
            return data.rows
        }
        return undefined
    };

    async addUser(username, hash, email) {
        const data = await client.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) returning *;', [username, hash, email]);
        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    };

    async selectUserByUsername(username) {
        const data = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        if (data.rowCount) {
            return data.rows[0]
        }
        return undefined
    };
}

module.exports = UsersService