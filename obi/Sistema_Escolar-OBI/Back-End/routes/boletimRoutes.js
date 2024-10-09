const express = require('express');
const router = express.Router();
const boletimController = require('../controllers/boletimController');

router.get('/', boletimController.getBoletim);

module.exports = router;

