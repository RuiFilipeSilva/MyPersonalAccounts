const categoriesFunctions = require("../functions/categoriesFunctions");
// MONGOOSE HERE IS TO CATCH THE VALIDATION ERRORS, SO WE CAN RETURN A 400 STATUS CODE INSTEAD OF A 500 ONE
const mongoose = require("mongoose");

exports.getCategories = async (req, res, next) => {
  await categoriesFunctions
    .getAllCategories()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((error) => {
      // Pass the error to the next middleware
      next(error);
    });
};

exports.createCategory = async (req, res, next) => {
  try {
    const category = req.body;
    const newCategory = await categoriesFunctions.createCategory(category);
    res.status(200).json(newCategory);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};

exports.editCategory = async (req, res, next) => {
  const id = req.params.id;
  const category = req.body;
  try {
    const editedCategory = await categoriesFunctions.editCategory(id, category);
    res.status(200).json(editedCategory);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
};
