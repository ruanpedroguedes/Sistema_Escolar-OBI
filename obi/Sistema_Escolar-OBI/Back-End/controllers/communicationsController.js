const Comunicado = require('../models/communicationsModel');
const User = require('../models/professorModel');

// Cria um novo comunicado
exports.createComunicado = async (req, res) => {
  try {
    const comunicado = new Comunicado(req.body);
    await comunicado.save();
    res.status(201).json(comunicado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtém todos os comunicados
exports.getComunicados = async (req, res) => {
  try {
    const comunicados = await Comunicado.find().populate('author', 'username');
    res.json(comunicados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtém comunicado por ID
exports.getComunicadoById = async (req, res) => {
  try {
    const comunicado = await Comunicado.findById(req.params.id).populate('author', 'username'); 
    if (!comunicado) {
      return res.status(404).json({ message: 'Comunicado não encontrado' });
    }
    res.json(comunicado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualiza comunicado por ID
exports.updateComunicado = async (req, res) => {
  try {
    const comunicado = await Comunicado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comunicado) {
      return res.status(404).json({ message: 'Comunicado não encontrado' });
    }
    res.json(comunicado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deleta comunicado por ID
exports.deleteComunicado = async (req, res) => {
  try {
    await Comunicado.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comunicado deletado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtém comunicados por usuário (autor)
exports.getComunicadosByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const comunicados = await Comunicado.find({ author: userId });

    res.status(200).json(comunicados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
