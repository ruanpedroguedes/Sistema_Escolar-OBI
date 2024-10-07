const ProfessorDiscipline = require('../models/professorDisciplineModel');
const User = require('../models/professorModel');
const Discipline = require('../models/disciplineModel');


exports.createProfessorDiscipline = async (req, res) => {
  try {
    const { professorId, disciplinaId } = req.body;

    
    const professor = await User.findById(professorId);
    if (!professor || professor.usertype !== "Professor") {
      return res.status(400).json({ message: 'Professor inválido ou não encontrado' });
    }

    
    const disciplina = await Discipline.findById(disciplinaId);
    if (!disciplina) {
      return res.status(400).json({ message: 'Disciplina não encontrada' });
    }

    
    const professorDiscipline = new ProfessorDiscipline({
      professor_id: professorId,
      disciplina_id: disciplinaId
    });
    await professorDiscipline.save();

    res.status(201).json({ message: 'Associação criada com sucesso', professorDiscipline });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getProfessorDisciplinas = async (req, res) => {
  try {
    const professorDisciplinas = await ProfessorDiscipline.find().populate('professor_id', 'username useremail').populate('disciplina_id', 'name');
    res.json(professorDisciplinas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getProfessorDisciplinaById = async (req, res) => {
  try {
    const professorDisciplina = await ProfessorDiscipline.findById(req.params.id).populate('professor_id', 'username useremail').populate('disciplina_id', 'name');
    
    if (!professorDisciplina) {
      return res.status(404).json({ message: 'Associação não encontrada' });
    }

    res.json(professorDisciplina);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateProfessorDisciplina = async (req, res) => {
  try {
    const { professorId, disciplinaId } = req.body;
    const professorDisciplina = await ProfessorDiscipline.findByIdAndUpdate(req.params.id, { professor_id: professorId, disciplina_id: disciplinaId }, { new: true });

    if (!professorDisciplina) {
      return res.status(404).json({ message: 'Associação não encontrada' });
    }

    res.json(professorDisciplina);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteProfessorDisciplina = async (req, res) => {
  try {
    const professorDisciplina = await ProfessorDiscipline.findByIdAndDelete(req.params.id);

    if (!professorDisciplina) {
      return res.status(404).json({ message: 'Associação não encontrada' });
    }

    res.json({ message: 'Associação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};