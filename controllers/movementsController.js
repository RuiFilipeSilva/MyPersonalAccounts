const movementFunctions = require("../functions/movementsFunctions");
const AppError = require("../utils/appError");
// MONGOOSE HERE IS TO CATCH THE VALIDATION ERRORS, SO WE CAN RETURN A 400 STATUS CODE INSTEAD OF A 500 ONE
const mongoose = require("mongoose");

exports.getMovements = async (req, res, next) => {
  try {
    const movements = await movementFunctions.getMovements();
    res.status(200).json(movements);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};

exports.createMovement = async (req, res, next) => {
  try {
    const movement = req.body;
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
    // Pass the error to the next middleware
    next(error);
  }
};
