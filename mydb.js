const mongoose = require('mongoose');
console.log('MONGO_CONNECTION: ' + process.env.MONGO_CONNECTION);
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const connection = await mongoose.connect(process.env.MONGO_CONNECTION)
        console.log('MongoDB is Connected: ' + connection.connection.host);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

//I create a connection to call in models because the moongoose-sequence plugin needs it
module.exports = {connectDB, connection: mongoose.connection};