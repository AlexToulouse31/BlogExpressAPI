const express = require('express');
//const client = require('./src/client');
const articlesRouter = require('./src/routes/articlesRouter');

const app = express();
const port = 8000;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express.json());

app.use('/api/articles', articlesRouter);
//app.use('/api/users', usersRouter);


app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
});
