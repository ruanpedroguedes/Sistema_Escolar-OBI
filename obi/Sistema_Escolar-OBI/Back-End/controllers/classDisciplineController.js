const ClassDiscipline = require('../models/classDisciplineModel');
const Class = require('../models/classModel');
const Discipline = require('../models/disciplineModel');

// Criar uma nova associação entre Classe e Disciplina
exports.createClassDiscipline = async (req, res) => {
  try {
    const { classId, disciplineId } = req.body;

    // Verifica se a classe existe
    const classData = await Class.findById(classId);
    if (!classData) {
      return res.status(404).json({ message: 'Classe não encontrada' });
    }

    // Verifica se a disciplina existe
    const discipline = await Discipline.findById(disciplineId);
    if (!discipline) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    // Cria a associação entre a classe e a disciplina
    const classDiscipline = new ClassDiscipline({
      turma_id: classId,
      disciplina_id: disciplineId
    });

    await classDiscipline.save();
    res.status(201).json(classDiscipline);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter todas as associações entre Classe e Disciplina
exports.getClassDisciplines = async (req, res) => {
  try {
    const classDisciplines = await ClassDiscipline.find()
      .populate('turma_id', 'name description')
      .populate('disciplina_id', 'name description');
    res.json(classDisciplines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter uma associação por ID
exports.getClassDisciplineById = async (req, res) => {
  try {
    const classDiscipline = await ClassDiscipline.findById(req.params.id)
      .populate('turma_id', 'name description')
      .populate('disciplina_id', 'name description');

    if (!classDiscipline) {
      return res.status(404).json({ message: 'Associação entre Classe e Disciplina não encontrada' });
    }

    res.json(classDiscipline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar uma associação por ID
exports.updateClassDiscipline = async (req, res) => {
  try {
    const { classId, disciplineId } = req.body;

    // Verifica se a classe e disciplina existem
    const classData = await Class.findById(classId);
    if (!classData) {
      return res.status(404).json({ message: 'Classe não encontrada' });
    }

    const discipline = await Discipline.findById(disciplineId);
    if (!discipline) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    // Atualiza a associação entre a classe e a disciplina
    const updatedClassDiscipline = await ClassDiscipline.findByIdAndUpdate(
      req.params.id,
      { turma_id: classId, disciplina_id: disciplineId },
      { new: true }
    );

    if (!updatedClassDiscipline) {
      return res.status(404).json({ message: 'Associação não encontrada' });
    }

    res.json(updatedClassDiscipline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar uma associação por ID
exports.deleteClassDiscipline = async (req, res) => {
  try {
    await ClassDiscipline.findByIdAndDelete(req.params.id);
    res.json({ message: 'Associação entre Classe e Disciplina deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
