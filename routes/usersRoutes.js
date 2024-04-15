const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
const passport = require('passport');

// Using the passport.authenticate middleware with our JWT strategy in every routes that we want to protect
router.use(passport.authenticate('jwt',{session:false}));

router.get('/', passport.authenticate('jwt',{session:false}), controller.getAllUsers);

module.exports = router;