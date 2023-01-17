const express = require('express')
const usersRouter = express.Router()
const client = require('../client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsersController = require('../controllers/usersController');
const usersController = new UsersController();

usersRouter.get('/', usersController.getUsers);

usersRouter.post('/register', usersController.register);

usersRouter.post('/login', usersController.login);

module.exports = usersRouter;
