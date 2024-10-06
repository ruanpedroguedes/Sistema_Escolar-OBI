const express = require('express');
const router = express.Router();
const Aluno = require('../models/alunoModel');
const { registerUser } = require('../controllers/cadastramentoController')

router.get('/:id', async (req, res) => {
          try {
              const aluno = await Aluno.findById(req.params.id);
              if (!aluno) {
                  return res.status(404).json({ message: 'Aluno não encontrado' });
              }
              res.status(200).json(aluno);
          } catch (error) {
              res.status(500).json({ message: 'Erro ao obter aluno.', error: error.message });
          }
      });
      
      module.exports = router