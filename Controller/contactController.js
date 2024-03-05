// GET User
// @//api/tasks

// const asyncHandler = require("../Middleware/asyncHandller");
const Contacts = require("../Model/contactModel");

const getContacts = async (req, res, next) => {
  try {
    const Contact = await Contacts.find({ user_id: req.user._id });
    res.status(200).json(Contact);
  } catch (err) {
    next(err)
  }
};

// Post contacts
// @//api/addContacts

const addContacts = async (req, res, next) => {
  try {
    const Name = req.body.Name;
    const Email = req.body.Email;
    const PhoneNo = req.body.PhoneNo;
    const Age = req.body.Age;
    const uuid = req.user._id;
    // console.log(uuid);
    const userAvailable = await Contacts.findOne({ Email: req.body.Email });
    //  console.log(userAvailable);
    if (userAvailable) {
      throw new Error("Email already Exist")
    }
    if (!Name || !Email || !PhoneNo || !Age) {

      throw new Error("Please Add All Details")

    }

    else {
      const data = new Contacts({
        Name,
        Email,
        PhoneNo,
        Age,
        user_id: uuid,
      });
      const info = await data.save();
      res.json(info);
    }



  } catch (err) {

    next(err)
  }
};

//Update Task
// @//api/update/:id

const updateContacts = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { Name, Email, PhoneNo, Age } = req.body
    const contactdetails = await Contacts.findById({ _id: id });

    if (!contactdetails) {

      const err = new Error("Contact Not Found")
      return next(err)

    }

    else {
      if (contactdetails.user_id.toString() !== req.user._id) {
        const err = new Error("Try to unauthorized access")
        return next(err)

      }

      else {

        if (!Name && !Email && !PhoneNo && !Age) {
          return res.status(200).json("No changes in this Contact!!")
        }

        else {

          const existingUser = await Contacts.findOne({ Email });

          if (existingUser && existingUser._id.toString() !== id) {
            throw new Error("Email Already Exist")
          }

          const updatetask = await contactdetails.updateOne({
            Name,
            Email,
            PhoneNo,
            Age
          });

          res.status(200).json("Task Updated Successfully");
        }

      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//DELETE TASK
//@ DELETE api/delete/:id
const deleteContacts = async (req, res,next) => {
  try {
    const id = req.params.id;
    const contactdetails = await Contacts.findById({ _id: id });

    if (!contactdetails) {
      return res.status(400).json("Contact Not Found");
    }

    else {
      if (contactdetails.user_id.toString() !== req.user._id) {
        const err = new Error("Try to unauthorized access")
        return next(err)
      } else {
        await Contacts.deleteOne({ _id: id });
        res.status(200).json("Contact deleted Successfully");
      }
    }
  }

  catch (err) {
    next(err)
  }
};
module.exports = { getContacts, addContacts, updateContacts, deleteContacts };
