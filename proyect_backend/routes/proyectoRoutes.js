const express = require('express');
const proyectoController = require('../controllers/proyectoController');

const router = express.Router();

// Rutas para proyectos
router.get('/', proyectoController.getAllProyectos);
router.get('/:folio', proyectoController.getProyectoById);
router.post('/', proyectoController.createProyecto);
router.put('/:folio', proyectoController.updateProyecto);
router.delete('/:folio', proyectoController.deleteProyecto);

module.exports = router;