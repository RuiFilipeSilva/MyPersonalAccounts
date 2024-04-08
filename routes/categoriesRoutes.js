const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriesController');

router.get('/', controller.getCategories);
router.post('/', controller.createCategory);
router.put('/:id', controller.editCategory);

module.exports = router;