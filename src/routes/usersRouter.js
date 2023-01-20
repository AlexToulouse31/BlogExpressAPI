const express = require('express')
const usersRouter = express.Router()
const client = require('../client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsersController = require('../controllers/usersController');
const usersController = new UsersController();


//permet de consulter tout les utilisateurs
usersRouter.get('/', usersController.getUsers);
//permet de créer un nouvel utilisateur
usersRouter.post('/register', usersController.register);
//permet de se connecter
usersRouter.post('/login', usersController.login);

module.exports = usersRouter;
