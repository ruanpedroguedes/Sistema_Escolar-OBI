const Disciplina = require("../models/disciplineModel");
const User = require("../models/userModel");
const ProfessorDiscipline = require("../models/professorDisciplineModel");

// Criação de disciplina e associação com professor
exports.createDisciplina = async (req, res) => {
  try {
    const { name, description, professorId } = req.body;

    // Cria a nova disciplina
    const disciplina = new Disciplina({ name, description });
    await disciplina.save();

    // Verifica se o professor existe
    const professor = await User.findById(professorId);
    if (!professor || professor.usertype !== "Professor") {
      return res.status(400).json({ message: 'Professor inválido ou não encontrado' });
    }

    // Cria a associação entre o professor e a disciplina
    const professorDiscipline = new ProfessorDiscipline({
      professor_id: professorId,
      disciplina_id: disciplina._id
    });
    await professorDiscipline.save();

    res.status(201).json({ disciplina, professorDiscipline });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Buscar todas as disciplinas, incluindo o professor associado
exports.getDisciplinas = async (req, res) => {
  try {
    const disciplinas = await Disciplina.find().populate({
      path: 'ProfessorDiscipline',
      populate: {
        path: 'professor_id',
        select: 'username useremail'
      }
    });

    res.json(disciplinas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar disciplina por ID, incluindo o professor associado
exports.getDisciplinaById = async (req, res) => {
  try {
    const disciplina = await Disciplina.findById(req.params.id).populate({
      path: 'ProfessorDiscipline',
      populate: {
        path: 'professor_id',
        select: 'username useremail'
      }
    });

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    res.json(disciplina);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualização da disciplina
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

// Deletar disciplina e sua associação com o professor
exports.deleteDisciplina = async (req, res) => {
  try {
    await Disciplina.findByIdAndDelete(req.params.id);

    // Remove a associação com o professor
    await ProfessorDiscipline.deleteMany({ disciplina_id: req.params.id });

    res.json({ message: 'Disciplina deletada e associações removidas' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Adicionar um aviso à disciplina
exports.addAviso = async (req, res) => {
  try {
    const { disciplinaId, author, content } = req.body;
    const disciplina = await Disciplina.findById(disciplinaId);

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    disciplina.avisos.push({ author, date: new Date(), content });
    await disciplina.save();

    res.status(201).json(disciplina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Adicionar um material à disciplina
exports.addMaterial = async (req, res) => {
  try {
    const { disciplinaId, author, link } = req.body;
    const disciplina = await Disciplina.findById(disciplinaId);

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    disciplina.materiais.push({ author, date: new Date(), link });
    await disciplina.save();

    res.status(201).json(disciplina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Adicionar uma enquete à disciplina
exports.addEnquete = async (req, res) => {
  try {
    const { disciplinaId, author, question, options } = req.body;
    const disciplina = await Disciplina.findById(disciplinaId);

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    disciplina.enquetes.push({ author, date: new Date(), question, options });
    await disciplina.save();

    res.status(201).json(disciplina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remover um aviso da disciplina
exports.deleteAviso = async (req, res) => {
  try {
    const { disciplinaId, avisoId } = req.params;
    const disciplina = await Disciplina.findById(disciplinaId);

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    disciplina.avisos.id(avisoId).remove();
    await disciplina.save();

    res.json(disciplina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remover um material da disciplina
exports.deleteMaterial = async (req, res) => {
  try {
    const { disciplinaId, materialId } = req.params;
    const disciplina = await Disciplina.findById(disciplinaId);

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    disciplina.materiais.id(materialId).remove();
    await disciplina.save();

    res.json(disciplina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remover uma enquete da disciplina
exports.deleteEnquete = async (req, res) => {
  try {
    const { disciplinaId, enqueteId } = req.params;
    const disciplina = await Disciplina.findById(disciplinaId);

    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }

    disciplina.enquetes.id(enqueteId).remove();
    await disciplina.save();

    res.json(disciplina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
