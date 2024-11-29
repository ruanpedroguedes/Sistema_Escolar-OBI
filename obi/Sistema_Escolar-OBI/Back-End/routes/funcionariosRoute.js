const express = require('express');
const router = express.Router();
const { getProfessores, getCoordenacao, deleteProfessor, deleteCoordenador, getProfessorById, getCoordenadorById } = require('../controllers/funcionariosController');

router.get('/professores', getProfessores);
router.get('/professores/:id', getProfessorById); // Rota para obter um professor pelo ID

router.get('/coordenacao', getCoordenacao);
router.get('/coordenacao/:id', getCoordenadorById); // Adicionando a rota para obter um coordenador pelo ID
router.delete('/professores/:id', deleteProfessor);
router.delete('/coordenacao/:id', deleteCoordenador);

module.exports = router;