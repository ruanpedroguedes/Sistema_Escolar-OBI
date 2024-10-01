const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para buscar todos os usuários
router.get('/users', userController.getUsers);

// Rota para buscar um usuário por ID
router.get('/users/:id', userController.getUserById);

// Rota para atualizar um usuário por ID
router.put('/users/:id', userController.updateUser);

// Rota para deletar um usuário por ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;


