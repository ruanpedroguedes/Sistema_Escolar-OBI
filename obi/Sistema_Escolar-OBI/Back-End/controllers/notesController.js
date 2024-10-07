const Note = require('../models/noteModel');
const User = require('../models/professorModel');
const Discipline = require('../models/disciplineModel');
const Class = require('../models/classModel');

// Criar uma nova nota associando a aluno, disciplina, professor e turma
exports.createNote = async (req, res) => {
  try {
    const { alunoId, disciplinaId, professorId, turmaId, conceito } = req.body;

    // Verifica se o aluno, disciplina, professor e turma existem
    const aluno = await User.findById(alunoId);
    const disciplina = await Discipline.findById(disciplinaId);
    const professor = await User.findById(professorId);
    const turma = await Class.findById(turmaId);

    if (!aluno || aluno.usertype !== "Aluno") {
      return res.status(400).json({ message: 'Aluno inválido ou não encontrado' });
    }
    if (!disciplina) {
      return res.status(400).json({ message: 'Disciplina não encontrada' });
    }
    if (!professor || professor.usertype !== "Professor") {
      return res.status(400).json({ message: 'Professor inválido ou não encontrado' });
    }
    if (!turma) {
      return res.status(400).json({ message: 'Turma não encontrada' });
    }

    // Cria a nova nota
    const note = new Note({
      aluno_id: alunoId,
      disciplina_id: disciplinaId,
      conceito
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Buscar todas as notas associadas a aluno, disciplina, professor e turma
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate('aluno_id', 'username').populate('disciplina_id', 'name');
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar nota por ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('aluno_id', 'username').populate('disciplina_id', 'name');
    if (!note) {
      return res.status(404).json({ message: 'Nota não encontrada' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar nota por ID
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) {
      return res.status(404).json({ message: 'Nota não encontrada' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar nota por ID
exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Nota deletada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
