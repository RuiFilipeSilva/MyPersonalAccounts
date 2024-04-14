const usersFunctions = require("../functions/usersFunctions");
const AppError = require("../utils/appError");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await usersFunctions.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
