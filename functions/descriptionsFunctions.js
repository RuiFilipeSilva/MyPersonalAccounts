// TO DETECT THE VALIDATION ERRORS
const mongoose = require("mongoose");
const descriptionSchema = require("../models/description");
//FUNCTIONS
const categoryFunctions = require("./categoriesFunctions");

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
      throw {
        status: 409,
        message: "Description already exists",
      };
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
      throw {
        status: 404,
        message: "Category does not exists",
      };
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
      throw { status: 400, message: "Invalid category input" };
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
      throw {
        status: 404,
        message: "Description does not exists",
      };
    }
    const existCategory = await categoryFunctions.findCategoryById(
      description.category
    );
    if (!existCategory) {
      throw {
        status: 404,
        message: "Category does not exists",
      };
    }
    const existCategoryDescription = await descriptionSchema.findOne({
      name: existDescription.name,
      category: existCategory.name,
    });
    if (!existCategoryDescription) {
      throw {
        status: 404,
        message: "Description does not exists in the category",
      };
    }
  } catch (error) {
    throw error;
  }
};

exports.editCategoryinDescription = async (category_old, category_new) => {
  try {
    const descriptions = await descriptionSchema.updateMany(
      { category: category_old },
      { category: category_new }
    );
    return descriptions;
  } catch (error) {
    throw error;
  }
};
