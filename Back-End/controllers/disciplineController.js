const Disciplina = require("../models/disciplineModel");

exports.createDisciplina = async (req, res) => {
  try {
    const disciplina = new Disciplina(req.body);
    await disciplina.save();
    res.status(201).json(disciplina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDisciplina = async (req, res) => {
  try {
    const disciplinas = await Disciplina.find();
    res.json(disciplinas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDisciplinaById = async (req, res) => {
  try {
    const disciplina = await Disciplina.findById(req.params.id);
    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }
    res.json(disciplina);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDisciplina = async (req, res) => {
  try {
    const disciplina = await Disciplina.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }
    res.json(disciplina);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDisciplina = async (req, res) => {
  try {
    await Disciplina.findByIdAndDelete(req.params.id);
    res.json({ message: 'Disciplina deletada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
