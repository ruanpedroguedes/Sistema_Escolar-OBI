const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

// Rota para criar uma nova tarefa (com coordenadorId)
router.post('/', agendaController.createTask);

// Rota para obter todas as tarefas
router.get('/', agendaController.getTasks);

// Rota para obter uma tarefa específica por ID
router.get('/:id', agendaController.getTaskById); // Adicionei esta rota

// Rota para obter tarefas filtradas por unidade, curso e turma
router.get('/agenda/filter', agendaController.getTasksByFilters);

// Rota para atualizar uma tarefa existente
router.put('/agenda/:id', agendaController.updateTask);

// Rota para excluir uma tarefa
router.delete('/agenda/:id', agendaController.deleteTask);

module.exports = router;