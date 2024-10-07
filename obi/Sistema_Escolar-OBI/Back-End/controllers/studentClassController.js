const StudentClass = require('../models/studentClassModel');
const User = require('../models/alunoModel');
const Class = require('../models/classModel');

// Criar uma associação entre aluno e turma
exports.addStudentToClass = async (req, res) => {
  try {
    const { studentId, classId } = req.body;

    // Verificar se o aluno existe
    const student = await User.findById(studentId);
    if (!student || student.usertype !== 'Aluno') {
      return res.status(400).json({ message: 'Aluno inválido ou não encontrado' });
    }

    // Verificar se a turma existe
    const classData = await Class.findById(classId);
    if (!classData) {
      return res.status(400).json({ message: 'Turma inválida ou não encontrada' });
    }

    // Verificar se o aluno já está associado a essa turma
    const existingAssociation = await StudentClass.findOne({ student_id: studentId, class_id: classId });
    if (existingAssociation) {
      return res.status(400).json({ message: 'Aluno já está associado a essa turma' });
    }

    // Criar nova associação entre aluno e turma
    const studentClass = new StudentClass({ student_id: studentId, class_id: classId });
    await studentClass.save();

    res.status(201).json({ message: 'Aluno adicionado à turma com sucesso', studentClass });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remover um aluno de uma turma
exports.removeStudentFromClass = async (req, res) => {
  try {
    const { studentId, classId } = req.body;

    // Verificar se a associação entre aluno e turma existe
    const studentClass = await StudentClass.findOneAndDelete({ student_id: studentId, class_id: classId });

    if (!studentClass) {
      return res.status(404).json({ message: 'Associação não encontrada' });
    }

    res.status(200).json({ message: 'Aluno removido da turma com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar todas as turmas de um aluno
exports.getClassesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const classes = await StudentClass.find({ student_id: studentId }).populate('class_id', 'name description');

    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: 'Nenhuma turma encontrada para esse aluno' });
    }

    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar todos os alunos de uma turma
exports.getStudentsByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const students = await StudentClass.find({ class_id: classId }).populate('student_id', 'username useremail');

    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'Nenhum aluno encontrado para essa turma' });
    }

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};