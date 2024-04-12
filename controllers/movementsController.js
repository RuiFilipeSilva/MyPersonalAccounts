const movementFunctions = require("../functions/movementsFunctions");
const AppError = require('../errors/appError');
// MONGOOSE HERE IS TO CATCH THE VALIDATION ERRORS, SO WE CAN RETURN A 400 STATUS CODE INSTEAD OF A 500 ONE
const mongoose = require("mongoose");

exports.getMovements = async (req, res) => {
  try {
    const movements = await movementFunctions.getMovements();
    res.status(200).json(movements);
  } catch (error) {
    // instanceof is a keyword that checks if an object is an instance of a specific class
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
  }
};

exports.createMovement = async (req, res) => {
  const movement = req.body;
  try {
    if (movement.date !== undefined) {
      if (movement.date) {
        const date = new Date(movement.date);
        if (date.toString() === "Invalid Date Format!") {
          throw {
            status: 400,
            message: "Invalid date",
          };
        }
      }
    }
    const newMovement = await movementFunctions.createMovement(movement);
    res.status(200).json(newMovement);
  } catch (error) {
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
  }
};