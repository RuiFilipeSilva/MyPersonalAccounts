const movementSchema = require("../models/movements");
const descriptionFunctions = require("./descriptionsFunctions");
const AppError = require("../errors/appError");

// Get all movements
exports.getMovements = async () => {
  try {
    const movements = await movementSchema.find();
    return movements;
  } catch (error) {
    throw Error(error);
  }
};

// Create a new movement
exports.createMovement = async (movement) => {
  try {
    //TODO: Validate if category and description exist and date is valid
    await descriptionFunctions.findDescriptionByIdAndCategoryId(movement);
    const newMovement = new movementSchema(movement);
    await newMovement.save();
    return newMovement;
  } catch (error) {
    throw error;
  }
};

// Update category in movements
exports.editCategoriesInMovements = async (category_old, category_new) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(category_old) &&
      !mongoose.Types.ObjectId.isValid(category_new)
    ) {
      throw new AppError(400, "Invalid category input");
    }
    const movements = await movementSchema.updateMany(
      { category: category_old },
      { category: category_new }
    );
    return movements;
  } catch (error) {
    throw error;
  }
};
