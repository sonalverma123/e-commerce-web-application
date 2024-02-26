const mongoose = require("mongoose");

const mongoURI = "mongodb://0.0.0.0:27017/Registration";

const connectToMongo = async() =>{
    try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
}
};

module.exports = connectToMongo;
