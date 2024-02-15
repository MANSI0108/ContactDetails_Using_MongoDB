const express = require("express");
const app = express();
const contactRoute = require("./Routes/contactRoute")
const userRoute = require("./Routes/userRoute")
const connectDB  = require("./config/db");
const errorHandler = require("./Middleware/asyncHandller");
require("dotenv").config();
PORT = process.env.PORT || 3000;

connectDB();



// app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api",contactRoute),
app.use("/api/user",userRoute),

app.use(errorHandler)


module.exports = app;