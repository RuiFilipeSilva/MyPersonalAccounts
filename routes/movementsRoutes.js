const express = require('express');
const router = express.Router();
const controller = require('../controllers/movementsController');

router.get('/', controller.getMovements);
router.post('/', controller.createMovement);

module.exports = router;
