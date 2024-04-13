const descriptionFunctions = require("../functions/descriptionsFunctions");
// MOONGOOSE HERE IS TO CATCH THE VALIDATION ERRORS, SO WE CAN RETURN A 400 STATUS CODE INSTEAD OF A 500 ONE
const mongoose = require("mongoose");

exports.getDescriptions = async (req, res, next) => {
  try {
    const descriptions = await descriptionFunctions.getDescriptions();
    res.status(200).json(descriptions);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};

exports.createDescription = async (req, res, next) => {
  try {
    const description = req.body;
    const newDescription = await descriptionFunctions.createDescription(
      description
    );
    res.status(200).json(newDescription);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};
