const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.DB_URL);
          console.log("DB connected Successfully");
    }
 catch(err){

    console.error("DB Not Connected")

 }
};

module.exports = connectDB ;
