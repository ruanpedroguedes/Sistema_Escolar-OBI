const express = require('express');
const router = express.Router();
const professorDisciplineController = require('../controllers/professorDisciplineController');


router.post('/professorDiscipline', professorDisciplineController.createProfessorDiscipline);


router.get('/professorDiscipline', professorDisciplineController.getProfessorDisciplinas);


router.get('/professorDiscipline/:id', professorDisciplineController.getProfessorDisciplinaById);


router.put('/professorDiscipline/:id', professorDisciplineController.updateProfessorDisciplina);


router.delete('/professorDiscipline/:id', professorDisciplineController.deleteProfessorDisciplina);

module.exports = router;
