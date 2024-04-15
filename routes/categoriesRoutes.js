const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriesController');
const passport = require('passport');

// Using the passport.authenticate middleware with our JWT strategy in every routes that we want to protect
router.use(passport.authenticate('jwt',{session:false}));

router.get('/', controller.getCategories);
router.post('/', controller.createCategory);
router.put('/:id', controller.editCategory);

module.exports = router;