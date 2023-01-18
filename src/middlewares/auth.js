const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.accessTokenSecret;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];


        jwt.verify(token, accessTokenSecret, (err, token) => {
            if (err) {
                return res.sendStatus(401)
            }
            req.userId = token.username;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;