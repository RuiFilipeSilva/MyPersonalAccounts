const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign({ data: user }, process.env.SECRET, { expiresIn: '1h' });
  }