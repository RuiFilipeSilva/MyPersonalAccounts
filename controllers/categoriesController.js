const categoriesFunctions = require('../functions/categoriesFunctions');
// MONGOOSE HERE IS TO CATCH THE VALIDATION ERRORS, SO WE CAN RETURN A 400 STATUS CODE INSTEAD OF A 500 ONE
const mongoose = require('mongoose');

exports.getCategories = async (req, res) => {
    await categoriesFunctions.getAllCategories().then((categories) => {
        res.status(200).json(categories);
    }).catch((error) => {
        // instanceof is a keyword that checks if an object is an instance of a specific class
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json({
                message: error.message
            });
        } else if (error.status) {
            res.status(error.status).json({
                message: error.message
            });
        } else {
            res.status(500).json({
                message: 'An unexpected error occurred'
            });
        }
    });
}

exports.createCategory = async (req, res) => {
    const category = req.body;
    try {
        const newCategory = await categoriesFunctions.createCategory(category);
        res.status(200).json(newCategory);
    } catch (error) {
        // instanceof is a keyword that checks if an object is an instance of a specific class
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json({
                message: error.message
            });
        } else if (error.status) {
            res.status(error.status).json({
                message: error.message
            });
        } else {
            res.status(500).json({
                message: 'An unexpected error occurred'
            });
        }
    }
}

exports.editCategory = async (req, res) => {
    const id = req.params.id;
    const category = req.body;
    try {
        const editedCategory = await categoriesFunctions.editCategory(id, category);
        res.status(200).json(editedCategory);
    } catch (error) {
        // instanceof is a keyword that checks if an object is an instance of a specific class
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json({
                message: error.message
            });
        } else if (error.status) {
            res.status(error.status).json({
                message: error.message
            });
        } else {
            res.status(500).json({
                message: 'An unexpected error occurred'
            });
        }
    }
}