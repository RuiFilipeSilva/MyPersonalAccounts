const jwt = require('jsonwebtoken');
const usersSchema = require('../models/usersSchema');

exports.generateToken = (user) => {
  return jwt.sign({ data:user }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
}