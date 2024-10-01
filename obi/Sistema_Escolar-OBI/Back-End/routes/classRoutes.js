const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// Rota para criar uma nova classe
router.post('/classes', classController.createClass);

// Rota para listar todas as classes
router.get('/classes', classController.getClasses);

// Rota para buscar uma classe por ID
router.get('/classes/:id', classController.getClassById);

// Rota para atualizar uma classe por ID
router.put('/classes/:id', classController.updateClass);

// Rota para deletar uma classe
router.delete('/classes/:id', classController.deleteClass);

module.exports = router;
