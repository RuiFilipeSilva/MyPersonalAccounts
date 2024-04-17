const usersSchema = require("../models/users.js");
const refreshTokenSchema = require("../models/refreshToken.js");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const { generateTokens } = require("../utils/auth");
const jwt = require("jsonwebtoken");

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
  const existingUser = await usersSchema.findOne({ email });
  if (!existingUser) {
    throw new AppError(400, "Invalid email or password");
  }
  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) {
    throw new AppError(400, "Invalid email or password");
  }

  // Convert the MongoDB object to a JSON object
  const userObject = existingUser.toObject();

  // Remove the password from the object
  delete userObject.password;
  // Generate the tokens
  const tokens = generateTokens(userObject);
  // Add the refresh token to the database
  await this.addRefreshToken(userObject._id.toString(), tokens.refreshToken);

  return tokens;
};

exports.addRefreshToken = async (user_id, refreshToken) => {
  // Check if the user already has a refresh token
  const existingToken = await refreshTokenSchema.findOne({ user: user_id });
  // If exist, i will remove it and add the new one
  if (existingToken) {
    await this.removeRefreshToken(user_id);
  }
  // Add the refresh token to the database
  const newToken = new refreshTokenSchema({
    user: user_id,
    token: refreshToken,
  });
  await newToken.save();
  return newToken;
};

exports.refreshToken = async (refreshToken) => {
  console.log(refreshToken);
  // Decode the refresh token
  const decode = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  console.log("DECODE", decode);
  // Check if the refresh token exists
  const existingToken = await refreshTokenSchema.findOne({
    user: decode.data._id,
  });
  if (!existingToken || existingToken.token !== refreshToken) {
    throw new AppError(403, "Invalid refresh token, please login again");
  }

  // Check if the first creation of refresh token it was 3 months ago
  const threeMonthsAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
  if (existingToken.createdAt < threeMonthsAgo) {
    throw new AppError(403, "Refresh token expired, please login again");
  }

  console.log("BEFORE REFRESH TOKEN")
  // Generate the tokens
  const user = await usersSchema.findById(decode.data._id).select("-password");
  console.log("USER", user)
  const tokens = generateTokens(user);
  // Add the refresh token to the database
  await this.updateRefreshToken(user._id, tokens.refreshToken, refreshToken);

  return tokens;
};

exports.updateRefreshToken = async (user_id, refreshToken, oldRefreshToken) => {
  // Check if the user already has a refresh token
  const existingToken = await refreshTokenSchema.findOne({ user:  user_id });
  console.log(existingToken.token !== oldRefreshToken);
  if (!existingToken || existingToken.token !== oldRefreshToken) {
    throw new AppError(404, "Token does not exists");
  }
  // Update the refresh token
  existingToken.token = refreshToken;
  await existingToken.save();
  return existingToken;
};

exports.logout = async (refreshToken) => {
  console.log(refreshToken);
  // Decode the refresh token
  const decode = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  console.log("decode", decode.data._id);
  // Check if the refresh token exists
  const existingToken = await refreshTokenSchema.findOne({
    user: decode.data._id,
  });
  if (!existingToken || existingToken.token !== refreshToken) { 
    throw new AppError(403, "Invalid refresh token, please login again");
  }
  // Delete the refresh token
  await existingToken.deleteOne();
};

exports.removeRefreshToken = async (user_id) => {
  // Check if the user already has a refresh token
  const existingToken = await refreshTokenSchema.findOne({ user:user_id });
  if (!existingToken) {
    throw new AppError(404, "Token does not exists");
  }
  // Delete the refresh token
  await existingToken.deleteOne();
}