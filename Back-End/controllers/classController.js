const Class = require('../models/classModel');
const User = require('../models/userModel');
const StudentClass = require('../models/studentClassModel');

// Criar uma nova classe e associar a professor, disciplina e alunos
exports.createClass = async (req, res) => {
  try {
    const { name, description, authorId, studentIds } = req.body;

    // Verifica se o professor existe
    const professor = await User.findById(authorId);
    if (!professor || professor.usertype !== "Professor") {
      return res.status(400).json({ message: 'Professor inválido ou não encontrado' });
    }

    // Cria a nova classe
    const newClass = new Class({ name, description, author: authorId });
    await newClass.save();

    // Associa alunos à turma
    if (studentIds && studentIds.length > 0) {
      for (const studentId of studentIds) {
        const student = await User.findById(studentId);
        if (!student || student.usertype !== "Aluno") {
          return res.status(400).json({ message: `Aluno inválido ou não encontrado (ID: ${studentId})` });
        }
        const studentClass = new StudentClass({ student_id: studentId, class_id: newClass._id });
        await studentClass.save();
      }
    }

    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Buscar todas as classes, incluindo o professor e alunos associados
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('author', 'username useremail').populate({
      path: 'students',
      populate: { path: 'student_id', select: 'username' }
    });

    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar classe por ID, incluindo professor e alunos associados
exports.getClassById = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id).populate('author', 'username useremail').populate({
      path: 'students',
      populate: { path: 'student_id', select: 'username' }
    });

    if (!classData) {
      return res.status(404).json({ message: 'Classe não encontrada' });
    }

    res.json(classData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar classe por ID
exports.updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClass) {
      return res.status(404).json({ message: 'Classe não encontrada' });
    }

    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar classe por ID
exports.deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: 'Classe deletada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
