const mongooose = require('mongoose');
// I need to import the connection to use the mongoose-sequence plugin
const {connection}=require('../mydb.js');
// I'm going to use the mongoose-sequence plugin to automatically generate an ID of the categories to use in GET's, but i continue using guid to PUT and DELETE as param.
const autoIncrementSequence = require('mongoose-sequence');
const autoIncrement = autoIncrementSequence(connection);

const userSchema = new mongooose.Schema({
    id_field: Number,
    name: {
        type: String,
        required: [true, 'is required'],
    },
    email: {
        type: String,
        required: [true, 'is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
              // Simple regex for email validation
              return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
          },
    },
    password: {
        type: String,
        required: [true, 'is required'],
    },
    img: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: [true, 'is required'],
        enum: ['admin', 'user'],
        default: 'user'
    },
    date_insert: {
        type: Date,
        required: true,
        default: Date.now
    }
});

userSchema.plugin(autoIncrement, {
    id: 'user_id',
    inc_field: 'id_field'
});

module.exports = mongooose.model('User', userSchema);