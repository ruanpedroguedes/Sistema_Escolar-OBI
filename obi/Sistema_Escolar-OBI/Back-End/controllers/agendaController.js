const Agenda = require('../models/agendaModel');
const Coordenacao = require('../models/coordenacaoModel'); // Importa o modelo de Coordenação

// Criar nova tarefa e associar ao coordenador
exports.createTask = async (req, res) => {
  try {
    const { unidade, curso, turma, titulo, descricao, dataHora } = req.body;
    // Recuperar o ID do coordenador do localStorage
    const coordenadorId = req.body.coordenadorId; // Presumindo que o ID do coordenador será enviado no corpo da requisição

    // Cria a nova tarefa e associa ao coordenador
    const newTask = new Agenda({ unidade, curso, turma, titulo, descricao, dataHora, coordenador: coordenadorId });
    await newTask.save();
    res.status(201).json({ message: 'Tarefa criada com sucesso!', task: newTask });
  } catch (error) {
    console.error('Erro ao criar tarefa:', error); // Log do erro no console
    res.status(500).json({ error: 'Erro ao criar tarefa.' });
  }
};

// Obter todas as tarefas
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Agenda.find().populate('coordenador', 'username useremail funcao'); // Popula com dados do coordenador
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error); // Log do erro no console
    res.status(500).json({ error: 'Erro ao buscar tarefas.' });
  }
};

// Obter uma tarefa por ID
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params; // Extrai o ID da rota
    console.log(`Buscando tarefa com ID: ${id}`); // Log do ID recebido

    const task = await Agenda.findById(id).populate('coordenador', 'username useremail funcao'); // Busca a tarefa por ID e popula com dados do coordenador

    if (!task) {
      console.log(`Tarefa não encontrada com ID: ${id}`);
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Erro ao buscar tarefa por ID:', error); // Log do erro no console
    res.status(500).json({ error: 'Erro ao buscar tarefa por ID.' });
  }
};

// Obter tarefas filtradas por unidade, curso e turma
exports.getTasksByFilters = async (req, res) => {
  try {
    const { unidade, curso, turma } = req.query;

    // Logando os parâmetros recebidos
    console.log('Parâmetros recebidos:', { unidade, curso, turma });

    // Filtros dinâmicos
    const filter = {};
    if (unidade) filter.unidade = unidade;
    if (curso) filter.curso = curso;
    if (turma) filter.turma = turma;

    console.log('Filtro aplicado:', filter); // Log do filtro

    const filteredTasks = await Agenda.find(filter).populate('coordenador', 'username useremail funcao');

    if (filteredTasks.length === 0) {
      console.log('Nenhuma tarefa encontrada para os filtros aplicados.');
    }

    res.status(200).json(filteredTasks);
  } catch (error) {
    console.error('Erro ao buscar tarefas com os filtros aplicados:', error); // Log do erro
    res.status(500).json({ error: 'Erro ao buscar tarefas com os filtros aplicados.' });
  }
};

// Atualizar tarefa
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, dataHora } = req.body;

    // Atualiza a tarefa sem necessidade de coordenadorId
    const updatedTask = await Agenda.findByIdAndUpdate(
      id,
      { titulo, descricao, dataHora },
      { new: true }
    ).populate('coordenador', 'username useremail funcao');

    if (!updatedTask) {
      console.log(`Tarefa não encontrada para atualização com ID: ${id}`);
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    res.status(200).json({ message: 'Tarefa atualizada com sucesso!', task: updatedTask });
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error); // Log do erro no console
    res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
  }
};

// Excluir tarefa
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Agenda.findByIdAndDelete(id);

    if (!deletedTask) {
      console.log(`Tarefa não encontrada para exclusão com ID: ${id}`);
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    res.status(200).json({ message: 'Tarefa excluída com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error); // Log do erro no console
    res.status(500).json({ error: 'Erro ao excluir tarefa.' });
  }
};