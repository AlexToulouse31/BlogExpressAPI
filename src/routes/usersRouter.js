const express = require('express')
const bcrypt = require('bcrypt');
const client = require('../client');
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'accesstokensecret';
