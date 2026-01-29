const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('We are connected to the mongo');
    } catch (error) {
        console.error('Uh oh, there are some issues connecting to the mongo. ', error.message);
        process.exit(1); //kill node and add error message
    }
}
module.exports = connectDB;