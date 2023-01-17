const UsersService = require("../services/usersService");
const usersService = new UsersService();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.accessTokenSecret;

class UsersController {

    async getUsers(req, res) {
        try {
            const data = await usersService.selectAllUsers();
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

    async register(req, res) {
        const { username, password, email } = req.body;

        bcrypt.hash(password, 10, async (err, hash) => {
            try {
                const data = await usersService.addUser(username, hash, email);
                res.status(201).json({
                    status: "created",
                    data: data
                })
            }

            catch (err) {
                console.log(err);
                res.status(404).json({
                    status: "not found",
                    data: null
                })
            }
        })
    };

    async login(req, res) {
        const username = req.body.username;
        const password = req.body.password;

    try {
        const data = await usersService.selectUserByUsername(username);
        if (!data) {

            res.status(404).json({ error: "User not found" });
        } else {
            const accessToken = jwt.sign({ username: data.id }, accessTokenSecret)
            const dbHash = data.password;
            console.log(accessToken);
            console.log(dbHash);
            bcrypt.compare(password, dbHash, function (err, result) {
                if (result === true) {
                    res.json({
                        message: "Login successful",
                        data: accessToken
                    });
                } else {
                    res.status(401).json({ error: "Incorrect password" });
                }
            });
        }
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ error: "An error occured while trying to log in" });
    }
};
}



module.exports = UsersController