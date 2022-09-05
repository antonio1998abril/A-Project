const express = require ('express');
const userController = require('../Controller/user')
const adminController = require('../Controller/admin')
const collaboratorController = require('../Controller/collaborator')
const auth = require('../Middleware/auth');

const routes = {
    user: express.Router()
    .post('/register',userController.register)
    .post('/login',userController.login)
    .get('/logout',userController.logout)
    .get('/refresh_token',userController.refreshToken)
    .get('/role',auth,userController.getRole)
    .post('/newPassword',userController.restorePassword)
    .get('/info',auth,userController.getInfo),


    admin: express.Router()
    .post('/registerNewUser',auth,adminController.registerNewUserAccount)
    .get('/getAllUser',auth,adminController.getAllUser)
    .get('/getAllManager',adminController.getAllManager)
    .delete('/deleteUserAccount/:id',adminController.deleteUserAccount)
    .put('/updateAccount/:id',adminController.updateUserAccount),

    collaborator: express.Router()
    .get('/getCollaboratorInfo/:id',auth,collaboratorController.getInfoCollaborator)

    
}

module.exports = routes