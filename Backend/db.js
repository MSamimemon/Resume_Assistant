const mongoose = require('mongoose');
const mongooseURI=process.env.MONGO_URI;

const connectToMongoDB=async()=>{
    try {
        await mongoose.connect(mongooseURI);
        console.log("Connected to Mongo DB Successfully");
    } catch (error) {
        console.error("Error Connecting to MongoDB",error);
    }
};

module.exports=connectToMongoDB;