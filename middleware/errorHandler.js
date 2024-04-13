const AppError = require("../utils/appError");
const mongoose = require("mongoose");

const errorHandler = (error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      message: error.message,
    });
  } else if (error instanceof AppError) {
    res.status(error.status).json({
      message: error.message,
    });
  } else {
    res.status(500).json({
      message: "An unexpected error occurred",
    });
  }
};

module.exports = errorHandler;
