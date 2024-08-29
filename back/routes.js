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

router.post('/createNotificacao', NotificacaoController.create)
router.get('/getByIdNotificacao/:id', NotificacaoController.getById)
router.get('/getNotificacaoByUserId/:idUser', NotificacaoController.getByUserId);
router.delete('/deleteNotificacao/:id', NotificacaoController.delete)
router.get('/getAllNotifi', NotificacaoController.getAll)

router.post('/createTable', CartaoController.createTable);
router.post('/createCartao', CartaoController.create)
router.get('/getByIdCartao/:id', CartaoController.getById)
router.get('/getByIdUserCartao/:id', CartaoController.getByIdUser)
router.delete('/deleteCartao/:id', CartaoController.delete)
router.put('/debitar/:idUser', CartaoController.debitar)

module.exports = router