const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  
 Username:{
    type:String,
    required:[true,"Username is required"],
 },
 Password:{
    type:String,
    required:[true,"Enter Your Password"],
 },
 Email:{
    type:String,
    required:[true,"Please Enter Valid Email"]
 }
},{timestamps:true})

const Users = mongoose.model('Users',userSchema)

module.exports = Users

 