const usersSchema = require("../models/users.js");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const { generateToken } = require("../utils/auth");

exports.register = async (user) => {
  //await usersSchema.validate(user.email);
  // Hash the password
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);
  // Create a new user
  const newUser = new usersSchema(user);
  await newUser.save();
  return newUser;
};

exports.login = async (user) => {
  const { email, password } = user;
  console.log(email, password);
  const existingUser = await usersSchema.findOne({ email });
  console.log(existingUser);
  if (!existingUser) {
    throw new AppError(400, "Invalid email or password");
  }
  const validPassword = await bcrypt.compare(password, existingUser.password);
  console.log(validPassword);
  if (!validPassword) {
    throw new AppError(400, "Invalid email or password");
  }
  
  // Convert the MongoDB object to a JSON object
  const userObject = existingUser.toObject();

  // Remove the password from the object
  delete userObject.password;

  return { token: generateToken(userObject) };
};
