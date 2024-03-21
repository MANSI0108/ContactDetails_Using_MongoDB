//desc registerUser
//@route POST/api/user/register
//acess public

const Users = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res, next) => {
  // const {Username,Password,Email} = req.body
  try {
    const Username = req.body.username;
    const Password = req.body.password;
    const Email = req.body.email;

    if (!Username || !Password || !Email) {
      return res.status(400).json({ Message: "All Data is Required" });
    } else {
      const userAvailable = await Users.findOne({ Email: req.body.email });
      // console.log("t1", userAvailable);

      if (userAvailable) {
        return res.status(400).json("User Already Exist");
      } else {
        //hashpassword
        const hashpassword = await bcrypt.hash(Password, 10);
        //  console.log(hashpassword);
        const data = new Users({ Username, Email, Password: hashpassword });
        const info = await data.save();
        res.json(info);
      }
    }
  } catch (error) {
    next(error);
  }
};

//desc loginUser
//@route POST/api/user/login
//acess public

const loginUser = async (req, res, next) => {
  try {
   
    const pass = req.body.password;
    const Email = req.body.email;
    
    if (!pass || !Email) {
      return res.status(400).json({ Message: "All Data is Required" });
    } else {
      const userAvailable = await Users.findOne({ Email: req.body.email });
      // console.log(userAvailable);
      if(userAvailable){
        const validPass = await bcrypt.compare(pass, userAvailable.Password);
        if (userAvailable && validPass) {
          const accessToken = jwt.sign(
            {
              user: {
                _id: userAvailable._id,
                Username: userAvailable.Username,
                Email: userAvailable.Email,
           
              },
            },
            process.env.AECCESS_TOKEN_SECRET_KEY,
            { expiresIn: "20m" }
          );
          return res.status(200).json({ accessToken });
        } 
      }
   else {
        throw new Error("Email and Password is invalid!!");
      }
    }
  } catch (error) {
    next(error);
  }
};

//desc currentUser
//@route GET/api/user/currentUser
//acess private

const currentUser = async (req, res,next) => {
  try {
  res.json(req.user);
    
  } catch (error) {
    next(error)
  }
};

module.exports = { registerUser, loginUser, currentUser };
