const express = require('express');
const router = express.Router();
const slaveController = require('../controller/slave.controller');

// GET: összes rabszolga
router.get('/', slaveController.getAllSlaves);

// GET: egy rabszolga ID alapján
router.get('/:id', slaveController.getSlaveById);

// POST: új rabszolga létrehozása
router.post('/', slaveController.createSlave);

// PUT: rabszolga módosítása ID alapján
router.put('/:id', slaveController.updateSlave);

// DELETE: rabszolga törlése
router.delete('/:id', slaveController.deleteSlave);

module.exports = router;
