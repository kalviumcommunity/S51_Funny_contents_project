const express = require("express");
const userDetails = require("./models/models");
const { get } = require("mongoose");

const getRouter = express.Router();

getRouter.get("/GET", async (req, res) => {
  try {
    const details = await userDetails.find();

    console.log("Retrieved details:", details);

    if (details.length === 0) {
      return res.status(404).json({ message: "No details found" });
    }

    res.status(200).json(details);
  } catch (err) {
    console.error(err, "GET error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

getRouter.post("/POST", async (req, res) => {
  try {
    const { name, country, age, content } = req.body;
    const newUser = new userDetails({
      name,
      country,
      age,
      content,
    });
    await newUser.save();
    res.status(200).json({ "Successfully added new user": newUser });
  } catch (err) {
    console.error(err, "POST error");
  }
});

getRouter.patch("/PATCH/:id", async (req, res) => {
  const {id} = req.params;
  console.log(id)
  const updates = req.body;

  try {
    const updatedUser = await userDetails.findOneAndUpdate(
      { _id : id }, 
      { $set: updates },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Successfully updated user", updatedUser });
  } catch (err) {
    console.error(err, "PATCH error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});


getRouter.delete("/DELETE/:id", async (req, res) => {
  const { id: _id } = req.params;
  // console.log(_id, "_id");
  try {
    const deleteuser = await userDetails.findOneAndDelete({ _id }); 
    if (!deleteuser) {
      return res.status(404).json({ message: "User not found" });
    } 
    
    res.status(200).json({ message: "successfully Deleted user", deleteuser });
    console.log(deleteuser)
    
  } catch (err) {
    console.error(err, "DELETE error");
  }
});

module.exports = { getRouter };
