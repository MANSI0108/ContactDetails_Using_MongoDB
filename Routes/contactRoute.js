const express = require("express");
const { getContacts, addContacts, updateContacts, deleteContacts } = require("../Controller/contactController");
const validateToken = require("../Middleware/validateHandler");
const app = express();
const router = express.Router();

// router.use(validateToken)

router.get("/contacts",validateToken, getContacts);
// router.get("/Contacts/:id", validationToken, getUserByID);
router.post("/addcontact",validateToken, addContacts);
router.patch("/update/:id",validateToken, updateContacts);
router.delete("/delete/:id",validateToken, deleteContacts);







module.exports = router; 
