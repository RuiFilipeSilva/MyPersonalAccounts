const moongoose = require('mongoose');
const {connection} = require('../mydb.js');

const autoIncrementSequence = require('mongoose-sequence');
const autoIncrement = autoIncrementSequence(connection);

const refreshTokenSchema = new moongoose.Schema({
    id_field: Number,
    token: {
        type: String,
        required: [true, 'is required'],
    },
    user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: [true, 'is required'],
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

refreshTokenSchema.plugin(autoIncrement, {
    id: 'refreshToken_id',
    inc_field: 'id_field'
});

module.exports = moongoose.model('RefreshToken', refreshTokenSchema);