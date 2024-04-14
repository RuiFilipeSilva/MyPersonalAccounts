const usersSchema = require("../models/users.js");
const AppError = require("../utils/appError");

exports.getAllUsers = async () => {
    const users = await usersSchema.find().select('-password');
    return users;
};

