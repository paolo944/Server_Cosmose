const express = require('express');
const users = require('./entitites/users');
const Auth = require('./entitites/authentification');
const Msg = require('./entitites/messages');
//const Ami = require('./entitites/amis');

const api = express.Router();

api.use('/users', users);
api.use('/authentification', Auth);
api.use('/messages', Msg);
//api.use('/ami', Ami);

module.exports = api;