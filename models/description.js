const mongoose = require('mongoose');
// I need to import the connection to use the mongoose-sequence plugin
const { connection } = require('../mydb.js');
// I'm going to use the mongoose-sequence plugin to automatically generate an ID of the categories to use in GET's, but i continue using guid to PUT and DELETE as param.
const autoIncrementSequence = require('mongoose-sequence');
const autoIncrement = autoIncrementSequence(connection);

const descriptionSchema = new mongoose.Schema({
    id_field: Number,
    name: {
        type: String,
        required: [true, 'is required'],
    },
    category: {
        type: String,
        required: [true, ' is required'],
    },
    date_insert: {
        type: Date,
        required: true,
        default: Date.now
    }
});

descriptionSchema.plugin(autoIncrement, {
    id: 'description_id',
    inc_field: 'id_field'
});

module.exports = mongoose.model('Description', descriptionSchema);