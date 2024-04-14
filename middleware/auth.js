const jwt = require('jsonwebtoken');
const usersSchema = require('../models/usersSchema');

exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usersSchema.findById(decoded.data._id);
    if (!user) {
      res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}