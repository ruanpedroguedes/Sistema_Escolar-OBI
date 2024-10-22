const express = require('express');
const router = express.Router();
const { getProfessores, getCoordenacao, deleteProfessor, deleteCoordenador, getProfessorById } = require('../controllers/funcionariosController');

router.get('/professores', getProfessores);
router.get('/professores/:id', getProfessorById); // Nova rota para obter um professor pelo ID
router.get('/coordenacao/:id', getCoordenadorById);
router.get('/coordenacao', getCoordenacao);
router.delete('/professores/:id', deleteProfessor);
router.delete('/coordenacao/:id', deleteCoordenador);

module.exports = router;
