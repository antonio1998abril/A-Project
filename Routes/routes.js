const express = require ('express');
const userController = require('../Controller/user')
const auth = require('../Middleware/auth');

const routes = {
    user:express.Router()
    .post('/register',userController.register)
    .post('/login',userController.login)
    .get('/logout',userController.logout)
    .get('/refresh_token',userController.refreshToken)
    .get('/info',auth,userController.getInfo),
}

module.exports = routes