const express = require('express');
const router = express.Router();
const comunicadoController = require('../controllers/communicationsController');

// Rota para criar um novo comunicado
router.post('/comunicados', comunicadoController.createComunicado);

// Rota para obter todos os comunicados
router.get('/comunicados', comunicadoController.getComunicados);

// Rota para obter um comunicado por ID
router.get('/comunicados/:id', comunicadoController.getComunicadoById);

// Rota para atualizar um comunicado por ID
router.put('/comunicados/:id', comunicadoController.updateComunicado);

// Rota para deletar um comunicado por ID
router.delete('/comunicados/:id', comunicadoController.deleteComunicado);

// Rota para obter comunicados por ID do usuário (autor)
router.get('/comunicados/user/:userId', comunicadoController.getComunicadosByUserId);

module.exports = router;
