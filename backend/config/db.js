const mongoose = require('mongoose');

const connectDB = async(req, res) =>{
    try{
        console.log(process.env.MONGO_URL);
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log('mongoDB Connected Successfully')
    }
    catch(error){
        console.error('MongoDB connection failed',error.message),
        process.exit(1);
    }
}

module.exports = connectDB;