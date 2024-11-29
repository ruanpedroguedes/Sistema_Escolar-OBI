const express = require('express');
const router = express.Router();
const { getProfessores, getCoordenacao, deleteProfessor, deleteCoordenador, getProfessorById, getCoordenadorById, updateProfessor, updateCoordenador } = require('../controllers/funcionariosController');

router.get('/professores', getProfessores);
router.get('/professores/:id', getProfessorById); // Rota para obter um professor pelo ID
router.put('/professores/:id', updateProfessor); // Rota para atualizar um professor

router.get('/coordenacao', getCoordenacao);
router.get('/coordenacao/:id', getCoordenadorById); // Rota para obter um coordenador pelo ID
router.put('/coordenacao/:id', updateCoordenador); // Adicionando a rota para atualizar um coordenador
router.delete('/professores/:id', deleteProfessor);
router.delete('/coordenacao/:id', deleteCoordenador);

module.exports = router;