const userFunctions = require('../functions/usersModel');
// MOONGOOSE HERE IS TO CATCH THE VALIDATION ERRORS, SO WE CAN RETURN A 400 STATUS CODE INSTEAD OF A 500 ONE
const mongoose = require('mongoose');

exports.register = async (req, res) => {
    const user = req.body;
    try {
        if(user.password !== user.confirmPassword) {
            throw {
                status: 400,
                message: 'Passwords do not match'
            }
        }
        const newUser = await userFunctions.register(user);
        res.status(200).json(newUser);
    } catch (error) {
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