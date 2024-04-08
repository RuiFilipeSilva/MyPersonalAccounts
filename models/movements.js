const mongoose = require("mongoose");
// I need to import the connection to use the mongoose-sequence plugin
const { connection } = require("../mydb.js");
// I'm going to use the mongoose-sequence plugin to automatically generate an ID of the categories to use in GET's, but i continue using guid to PUT and DELETE as param.
const autoIncrementSequence = require("mongoose-sequence");
const autoIncrement = autoIncrementSequence(connection);

const movementSchema = new mongoose.Schema({
  id_field: Number,
  type: {
    type: String,
    required: [true, "is required"],
    enum: ["income", "expense"],
  },
  description: {
    type: String,
    required: [true, "is required"],
  },
  category: {
    type: String,
    required: [true, "is required"],
  },
  value: {
    type: Number,
    required: [true, "is required"],
  },
  date: {
    type: Date,
    required: [true, "is required"],
    default: Date.now,
  },
  date_insert: {
    type: Date,
    required: [true, "is required"],
    default: Date.now,
  },
});

//inc_field is the field that will be incremented | id is the name of the field that will be created
movementSchema.plugin(autoIncrement, {
  id: "movement_id",
  inc_field: "id_field",
});

module.exports = mongoose.model("Movement", movementSchema);
