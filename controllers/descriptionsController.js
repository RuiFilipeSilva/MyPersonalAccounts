const descriptionFunctions = require('../functions/descriptionsFunctions');
// MOONGOOSE HERE IS TO CATCH THE VALIDATION ERRORS, SO WE CAN RETURN A 400 STATUS CODE INSTEAD OF A 500 ONE
const mongoose = require('mongoose');

exports.getDescriptions = async (req, res) => {
    try {
        const descriptions = await descriptionFunctions.getDescriptions();
        res.status(200).json(descriptions);
    } catch (error) {
        // instanceof is a keyword that checks if an object is an instance of a specific class
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json({
                message: error.message
            });
        } else if (error instanceof AppError) {
            res.status(error.status).json({
                message: error.message,
            });
        } else {
            res.status(500).json({
                message: 'An unexpected error occurred'
            });
        }
    }
}

exports.createDescription = async (req, res) => {
    const description = req.body;
    try {
        const newDescription = await descriptionFunctions.createDescription(description);
        res.status(200).json(newDescription);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json({
                message: error.message
            });
        } else if (error instanceof AppError) {
            res.status(error.status).json({
                message: error.message,
            });
        } else {
            res.status(500).json({
                message: 'An unexpected error occurred'
            });
        }
    }
}