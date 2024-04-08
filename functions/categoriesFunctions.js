const categoriesSchema = require("../models/categories");
const mongoose = require("mongoose");

// Get all categories
exports.getAllCategories = async () => {
  try {
    const categories = await categoriesSchema.find();
    return categories;
  } catch (error) {
    throw new Error(error);
  }
};

// Create a new category
exports.createCategory = async (category) => {
  try {
    const existCategory = await this.findCategory(category);
    if (existCategory) {
      throw {
        status: 409,
        message: "Category already exists",
      };
    }
    const newCategory = new categoriesSchema(category);
    console.log("Before save: ", newCategory);
    const saveCategory = await newCategory.save();
    console.log("After save: ", saveCategory);
    return saveCategory;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Find category by name
exports.findCategory = async (category) => {
  try {
    const existCategory = await categoriesSchema.findOne({
      name: category.name,
    });
    return existCategory;
  } catch (error) {
    throw error;
  }
};

// Find category by id
exports.findCategoryById = async (categoryId) => {
  try {
    //Validate if input is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      throw { status: 400, message: "Invalid category input" };
    }
    const existCategory = await categoriesSchema.findById(categoryId);
    return existCategory;
  } catch (error) {
    throw error;
  }
};

// Edit category
exports.editCategory = async (id,category) => {
  try {
    //Validate if input is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw { status: 400, message: "Invalid category input" };
      }
    const existCategory = await this.findCategoryById(id);
    if (!existCategory) {
      throw {
        status: 404,
        message: "Category does not exists",
      };
    }
    const updatedCategory = await categoriesSchema.findByIdAndUpdate(
      id,
      category,
      { new: true }
    );
    return updatedCategory;
  } catch (error) {
    throw error;
  }
}
