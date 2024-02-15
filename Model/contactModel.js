const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users",
    required:true,
  },
  Name: {
    type: String,
    require: true,
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  Email:{
    type:String,
    required:true
  },
  PhoneNo:{
    type:Number,
    required:true,
    
  },
  Age:{
    type:String,
    required:true,
  }
});

const Contacts = mongoose.model('Contacts', contactSchema); 

module.exports = Contacts;
