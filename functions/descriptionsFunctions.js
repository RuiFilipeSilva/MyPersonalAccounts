// TO DETECT THE VALIDATION ERRORS
const mongoose = require("mongoose");
const descriptionSchema = require("../models/description");
//FUNCTIONS
const categoryFunctions = require("./categoriesFunctions");
const AppError = require("../errors/appError");


// Get all descriptions
exports.getDescriptions = async () => {
  try {
    const descriptions = await descriptionSchema.find();
    return descriptions;
  } catch (error) {
    throw Error(error);
  }
};

// Create a new description
exports.createDescription = async (description) => {
  try {
    const existingDescription = await this.findDescription(description);
    if (existingDescription) {
      throw new AppError(409, "Description already exists");
    }
    const newDescription = new descriptionSchema(description);
    await newDescription.save();
    return newDescription;
  } catch (error) {
    throw error;
  }
};

// Find description by name and category_id
exports.findDescription = async (description) => {
  try {
    //Validate if category exists
    const existCategory = await categoryFunctions.findCategoryById(
      description.category
    );
    if (!existCategory) {
      throw new AppError(404, "Category does not exists");
    }
    //Validate if description exists
    const existDescription = await descriptionSchema.findOne({
      name: description.name,
      category: existCategory.name,
    });
    return existDescription;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.findDescriptionById = async (descriptionId) => {
  try {
    //Validate if input is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(descriptionId)) {
      throw new AppError(400, "Invalid description input");
    }
    const existDescription = await descriptionSchema.findById(descriptionId);
    return existDescription;
  } catch (error) {
    throw error;
  }
};

// Verify if description are associated with a category by id's
exports.findDescriptionByIdAndCategoryId = async (description) => {
  try {
    const existDescription = await this.findDescriptionById(
      description.description
    );
    if (!existDescription) {
      throw new AppError(404, "Description does not exists");
    }
    const existCategory = await categoryFunctions.findCategoryById(
      description.category
    );
    if (!existCategory) {
      throw new AppError(404, "Category does not exists");
    }
    const existCategoryDescription = await descriptionSchema.findOne({
      name: existDescription.name,
      category: existCategory.name,
    });
    if (!existCategoryDescription) {
      throw new AppError(404, "Description does not exists in category");
    }
  } catch (error) {
    throw error;
  }
};

// Update category in descriptions
exports.editCategoryInDescriptions = async (category_old, category_new) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(category_old) &&
      !mongoose.Types.ObjectId.isValid(category_new)
    ) {
      throw new AppError(400, "Invalid category input");
    }
    const descriptions = await descriptionSchema.updateMany(
      { category: category_old },
      { category: category_new }
    );
    return descriptions;
  } catch (error) {
    throw error;
  }
};
