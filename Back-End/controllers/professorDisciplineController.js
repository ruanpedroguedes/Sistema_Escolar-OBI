const ProfessorDiscipline = require('../models/professorDisciplineModel');


exports.createProfessorDiscipline = async (req, res) => {
  try {
    const professorDiscipline = new ProfessorDiscipline(req.body);
    await professorDiscipline.save();
    res.status(201).json(professorDiscipline);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getProfessorDisciplines = async (req, res) => {
  try {
    const professorDisciplines = await ProfessorDiscipline.find()
      .populate('professor_id', 'username useremail') // Popula os detalhes do professor
      .populate('disciplina_id', 'nome'); // Popula os detalhes da disciplina
    res.json(professorDisciplines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getProfessorDisciplineById = async (req, res) => {
  try {
    const professorDiscipline = await ProfessorDiscipline.findById(req.params.id)
      .populate('professor_id', 'username useremail')
      .populate('disciplina_id', 'nome');
    
    if (!professorDiscipline) {
      return res.status(404).json({ message: 'Relação professor-disciplina não encontrada' });
    }
    res.json(professorDiscipline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateProfessorDiscipline = async (req, res) => {
  try {
    const professorDiscipline = await ProfessorDiscipline.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    ).populate('professor_id', 'username useremail')
     .populate('disciplina_id', 'nome');

    if (!professorDiscipline) {
      return res.status(404).json({ message: 'Relação professor-disciplina não encontrada' });
    }
    res.json(professorDiscipline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProfessorDiscipline = async (req, res) => {
  try {
    await ProfessorDiscipline.findByIdAndDelete(req.params.id);
    res.json({ message: 'Relação professor-disciplina deletada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
