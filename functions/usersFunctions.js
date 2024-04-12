const usersSchema = require("../models/usersSchema");
const bcrypt = require("bcrypt");

exports.register = async (user) => {
    try {
        await usersSchema.validate(user.email);
        // Hash the password
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
        const newUser = new usersSchema(user);
        await newUser.save();
        return newUser;
    } catch (error) {
        throw error;
    }
};

exports.findUser = async (email) => {
  try {
    let existUser = usersSchema.findOne({ email: email });
    if(existUser) {
      throw {
        status: 409,
        message: "User already exists",
      };
    }
  } catch (error) {
    throw error;
  }
};
