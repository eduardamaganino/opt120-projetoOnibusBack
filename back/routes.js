const connection = require('./database/connection')
const express = require('express')
const router = express.Router()
const UsuarioController = require('./controllers/usuario-controller')
const NotificacaoController = require('./controllers/notificacao-controller')
const CartaoController = require('./controllers/cartao-controller')

router.post('/login', UsuarioController.login)
router.post('/newUser',UsuarioController.newUser)
router.get('/showUser', UsuarioController.showUser)
router.get('/showUserId/:id', UsuarioController.showUserById)
router.delete('/deleteUser/:id', UsuarioController.deleteUser)
router.put('/updateUser/:id', UsuarioController.updateUser)

router.post('/create', NotificacaoController.create)
router.get('/getById/:id', NotificacaoController.getById)
router.delete('/delete/:id', NotificacaoController.delete)

router.post('/create', CartaoController.create)
router.get('/getById/:id', CartaoController.getById)
router.get('/getByIdUser/:id', CartaoController.getByIdUser)
router.delete('/delete/:id', CartaoController.delete)

module.exports = router