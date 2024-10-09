// routes/agendaRoute.js
const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

// Rota para criar uma nova tarefa
router.post('/agenda', agendaController.createTask);

// Rota para obter todas as tarefas
router.get('/agenda', agendaController.getTasks);

// Rota para obter tarefas filtradas por unidade, curso e turma
router.get('/agenda/filter', agendaController.getTasksByFilters);

// Rota para atualizar uma tarefa existente
router.put('/agenda/:id', agendaController.updateTask);

// Rota para excluir uma tarefa
router.delete('/agenda/:id', agendaController.deleteTask);

module.exports = router;
