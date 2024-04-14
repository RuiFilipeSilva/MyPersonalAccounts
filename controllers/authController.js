const authFunctions = require("../functions/authFunctions");
// MOONGOOSE HERE IS TO CATCH THE VALIDATION ERRORS, SO WE CAN RETURN A 400 STATUS CODE INSTEAD OF A 500 ONE
const mongoose = require("mongoose");
const AppError = require("../utils/appError");

exports.register = async (req, res, next) => {
  const user = req.body;
  try {
    if (user.password !== user.confirmPassword) {
      throw new AppError({
        status: 400,
        message: "Passwords do not match",
      });
    }
    const newUser = await authFunctions.register(user);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const user = req.body;
  console.log(user);
  try {
    const token = await authFunctions.login(user);
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
}