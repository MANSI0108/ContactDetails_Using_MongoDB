const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.AECCESS_TOKEN_SECRET_KEY;

const validateToken = async (req, res, next) => {
  try {
    const bearerHeader = await req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];
    jwt.verify(token, secretKey, (err, result) => {
        if (err) {
          const err = new Error("Token is Invalid")
          return next(err)
        }
        console.log(result);
        req.user = result.user;
        //  console.log(req.user._id);
        next();
      });

      if (!token) {
        throw new Error("user is not authorized")
      }
    } else {
      const err = new Error("Token Expired")
      next(err)

    }
  } catch (error) {
    next(error)
  }


};

module.exports = validateToken;
