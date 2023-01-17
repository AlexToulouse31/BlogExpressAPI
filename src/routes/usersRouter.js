const express = require('express')
const usersRouter = express.Router()
const client = require('../client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'accesstokensecret';

usersRouter.get('/', async (req, res) => {

    try {
        const data = await client.query('SELECT * FROM users');

        res.status(200).json({
            status: "success",
            data: { post: data.rows }
        })
    }

    catch (err) {
        res.status(404).json({
            status: "not found",
            data: null
        })
    }
});


usersRouter.post('/register', (req, res) => {
    const password = req.body.password;
    const user_id = req.body.user_id;

    bcrypt.hash(password, 10, async (err, hash) => {
        try {

            const data = await client.query('INSERT INTO users (user_id, password) VALUES ($1, $2) returning *;', [user_id, hash]);

            res.status(201).json({
                status: "created",
                data: data.rows
            })
        }

        catch (err) {
            console.log(err);
            res.status(404).json({
                status: "not found",
                data: null
            })
        }
    });
});

usersRouter.post('/login', async (req, res) => {
    const user_id = req.body.user_id;
    const password = req.body.password;

    try {
        const data = await client.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        if (data.rows.length === 0) {
             
            res.status(404).json({ error: "User not found" });
        } else {
            const requestDB = await client.query('SELECT password,id FROM users WHERE user_id = $1', [user_id])
            const accessToken = jwt.sign({ userId: requestDB.rows[0]['id']}, accessTokenSecret)
            const dbHash = data.rows[0]['password'];
            bcrypt.compare(password, dbHash, function (err, result) {
                if (result === true) {
                    res.json({ 
                        message: "Login successful",
                    data : accessToken });
                } else {
                    res.status(401).json({ error: "Incorrect password" });
                }
            });
        }
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ error: "An error occured while trying to log in" });
    }
});

module.exports = usersRouter;
