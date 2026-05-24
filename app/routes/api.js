const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const apiController = require('../controllers/apiController');

const upload = multer({ dest: path.join(__dirname, '..', 'uploads/') });

// Rotas de Admin
router.post('/login', apiController.login);
router.get('/check-auth', apiController.checkAuth);
router.post('/logout', apiController.logout);

// Rotas de Gatos
router.post('/gatos', upload.single('foto'), apiController.cadastrarGato);
router.get('/gatos', apiController.listarGatosPublico);
router.get('/admin/gatos', apiController.listarGatosAdmin);
router.put('/gatos/:id', apiController.editarGato);
router.put('/gatos/:id/adotado', apiController.marcarAdotado);
// A LINHA ABAIXO FOI REMOVIDA PARA EVITAR O ERRO
// router.get('/gatos/adotados', apiController.listarAdotadosPublico);

// Rotas de Adoção
router.post('/adotar', apiController.enviarPedido);
router.get('/adocoes', apiController.listarPedidosAdmin);

module.exports = router;