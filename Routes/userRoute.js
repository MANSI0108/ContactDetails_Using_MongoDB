const express = require("express")
const { registerUser, loginUser, currentUser } = require("../Controller/userController")
const validateToken = require("../Middleware/validateHandler")
const router = express.Router()



router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/currentUSer",validateToken ,currentUser)

module.exports = router