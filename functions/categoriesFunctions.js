const categoriesSchema = require("../models/categories");
const movementsFunctions = require("./movementsFunctions");
const descriptionsFunctions = require("./descriptionsFunctions");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");

// Get all categories
exports.getAllCategories = async () => {
    const categories = await categoriesSchema.find();
    return categories;
};

// Create a new category
exports.createCategory = async (category) => {
    const existCategory = await this.findCategory(category);
    if (existCategory) {
      throw new AppError(409, "Category already exists");
    }
    const newCategory = new categoriesSchema(category);
    console.log("Before save: ", newCategory);
    const saveCategory = await newCategory.save();
    console.log("After save: ", saveCategory);
    return saveCategory;
};

// Find category by name
exports.findCategory = async (category) => {
    const existCategory = await categoriesSchema.findOne({
      name: category.name,
    });
    if (!existCategory) {
      throw new AppError(404, "Category does not exists");
    }
    return existCategory;
};

// Find category by id
exports.findCategoryById = async (categoryId) => {
  //Validate if input is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new AppError(400, "Invalid category input");
  }
  const existCategory = await categoriesSchema.findById(categoryId);
  if (!existCategory) {
    throw new AppError(404, "Category does not exists");
  }
  return existCategory;
};

// Edit category
exports.editCategory = async (id, category) => {
  //Validate if input is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(400, "Invalid category input");
  }
  await this.findCategoryById(id);
  const updatedCategory = await categoriesSchema.findByIdAndUpdate(
    id,
    category,
    { new: true }
  );
  // Update category in movements and descriptions
  await movementsFunctions.editCategoriesInMovements(id, updatedCategory._id);
  await descriptionsFunctions.editCategoryInDescriptions(
    id,
    updatedCategory._id
  );
  return updatedCategory;
};
