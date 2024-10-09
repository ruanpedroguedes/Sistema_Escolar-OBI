// controllers/agendaController.js
const Agenda = require('../models/agendaModel');

// Criar nova tarefa
exports.createTask = async (req, res) => {
  try {
    const { unidade, curso, turma, titulo, descricao, dataHora } = req.body;
    const newTask = new Agenda({ unidade, curso, turma, titulo, descricao, dataHora });
    await newTask.save();
    res.status(201).json({ message: 'Tarefa criada com sucesso!', task: newTask });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa.' });
  }
};

// Obter todas as tarefas
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Agenda.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas.' });
  }
};

// Obter tarefas por unidade, curso e turma
exports.getTasksByFilters = async (req, res) => {
  try {
    const { unidade, curso, turma } = req.query;
    const filteredTasks = await Agenda.find({ unidade, curso, turma });
    res.status(200).json(filteredTasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas com os filtros aplicados.' });
  }
};

// Atualizar tarefa
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, dataHora } = req.body;

    const updatedTask = await Agenda.findByIdAndUpdate(
      id,
      { titulo, descricao, dataHora },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ error: 'Tarefa não encontrada.' });

    res.status(200).json({ message: 'Tarefa atualizada com sucesso!', task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
  }
};

// Excluir tarefa
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Agenda.findByIdAndDelete(id);

    if (!deletedTask) return res.status(404).json({ error: 'Tarefa não encontrada.' });

    res.status(200).json({ message: 'Tarefa excluída com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir tarefa.' });
  }
};
