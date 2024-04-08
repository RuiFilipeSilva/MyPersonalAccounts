const movementSchema = require("../models/movements");
const descriptionFunctions = require("./descriptionsFunctions");

exports.getMovements = async () => {
  try {
    const movements = await movementSchema.find();
    return movements;
  } catch (error) {
    throw Error(error);
  }
};

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

exports.editCategoriesInMovements = async (category_old, category_new) => {
    try{
        const movements = await movementSchema.updateMany({category: category_old}, {category: category_new});
        return movements;
    }
    catch(error){
        throw error;
    }
}