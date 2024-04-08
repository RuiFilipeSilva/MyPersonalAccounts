const express = require('express');
const router = express.Router();
const controller = require('../controllers/descriptionsController');

router.get('/', controller.getDescriptions);
router.post('/', controller.createDescription);

module.exports = router;