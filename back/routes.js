const connection = require('./database/connection');
const express = require('express');
const router = express.Router();
const UsuarioController = require('./controllers/usuario-controller');
const NotificacaoController = require('./controllers/notificacao-controller');
const CartaoController = require('./controllers/cartao-controller');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

// Rotas para usuários
router.post('/login', UsuarioController.login);
router.post('/newUser', UsuarioController.newUser);
router.get('/showUser', UsuarioController.showUser);
router.get('/showUserId/:id', UsuarioController.showUserById);
router.delete('/deleteUser/:id', UsuarioController.deleteUser);
router.put('/updateUser/:id', UsuarioController.updateUser);
router.put('/updateSenha/:id', UsuarioController.editPassword);

// Rotas para notificações
router.post('/createNotificacao', NotificacaoController.create);
router.get('/getByIdNotificacao/:id', NotificacaoController.getById);
router.get('/getNotificacaoByUserId/:idUser', NotificacaoController.getByUserId);
router.delete('/deleteNotificacao/:id', NotificacaoController.delete);
router.get('/getAllNotifi', NotificacaoController.getAll);
router.put('/notificacoes/status/:idUser', NotificacaoController.updateStatus);

// Rotas para cartões
router.post('/createTable', CartaoController.createTable);
router.post('/createCartao', CartaoController.create);
router.get('/getByIdCartao/:id', CartaoController.getById);
router.get('/getByIdUserCartao/:id', CartaoController.getByIdUser);
router.delete('/deleteCartao/:id', CartaoController.delete);
router.put('/debitar/:idUser', CartaoController.debitar);
router.put('/atualizarValorDebito', CartaoController.atualizarValorDebito);
router.get('/saldo/:idUser', CartaoController.obterSaldo);

// Rota para upload de PDF e solicitação de cartão
router.post('/solicitarCartao/:idUser', upload.single('file'), CartaoController.solicitarCartao);

// Rotas para o administrador
router.put('/processarSolicitacao/:id', CartaoController.processarSolicitacao);
router.put('/processarSolicitacaoSaldo/:id', CartaoController.processarSolicitacaoSaldo);

// Rota para adicionar saldo
router.post('/adicionarSaldo/:idUser', CartaoController.adicionarSaldo);

// Novas rotas para solicitações pendentes
router.get('/solicitacoesCartaoPendentes', CartaoController.getSolicitacoesCartaoPendente);
router.get('/solicitacoesSaldoPendentes', CartaoController.getSolicitacoesSaldoPendente);

module.exports = router;
