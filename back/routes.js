const connection = require('./database/connection')
const express = require('express')
const router = express.Router()
const UsuarioController = require('./controllers/usuario-controller')

router.post('/login', UsuarioController.login)
router.post('/newUser',UsuarioController.newUser)
router.get('/showUser', UsuarioController.showUser)
router.get('/showUserId/:id', UsuarioController.showUserById)
router.delete('/deleteUser/:id', UsuarioController.deleteUser)
router.put('/updateUser/:id', UsuarioController.updateUser)

module.exports = router