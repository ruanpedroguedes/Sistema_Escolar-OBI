const express = require('express');
const router = express.Router();
const { getProfessores, getCoordenacao, deleteProfessor, deleteCoordenador } = require('../controllers/funcionariosController');

router.get('/professores', getProfessores);
router.get('/coordenacao', getCoordenacao);
router.delete('/professores/:id', deleteProfessor);
router.delete('/coordenacao/:id', deleteCoordenador);

module.exports = router;
