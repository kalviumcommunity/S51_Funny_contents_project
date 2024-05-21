const express = require("express");
const users = require("./models/m2");
const userDetails = require("./models/models")
const validators = require("./validator");
const { sign } = require("crypto");
const getRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
require('dotenv').config()


const JWT_SECRET = process.env.SECRET_ACCESS_TOKEN

//  fetch DATA
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

// upload DATA
getRouter.post("/POST", async (req, res) => {
  try {
    const { error, value } = validators.PostAndUpdateValidator(req.body);
    if (error) {
      res.status(400).json(error.details);
    } else {
      const { name, country, age, content } = req.body;
      const newUser = new userDetails({
        name,
        country,
        age,
        content,
      });
      await newUser.save();
      res.status(200).json({ "Successfully added new user": newUser });
    }
  } catch (error) {
    console.error(error.message, "POST error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// signup USER
getRouter.post("/SIGNUP", async (req, res) => {
  try {
    const { error, value } = validators.AuthValidator(req.body);
    if (error) {
      res.status(400).json(error.details);
    }else {
      const { username, country, age, password } = req.body;
      const salt = await bcrypt.genSalt(10); // Await the salt generation
      const hashedPassword = await bcrypt.hash(password, salt); // Await the password hashing
      const newUser = new users({
        username,
        country,
        age,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(200).json({ newUser });
    }
  } catch (err) {
    console.error(err, "POST error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//login USER
getRouter.post("/LOGIN", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const signedUpUser = await users.findOne({ username });
    console.log(username, password, "password");
    console.log(signedUpUser)
    if (!signedUpUser) {
      return res.status(400).json({ message: 'Username not found' });
  }

  const validPassword = bcrypt.compare(password, signedUpUser.password);
  console.log(validPassword)
  if (!validPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
  }

  const tokenPayload = { id: signedUpUser._id, username: signedUpUser.username };
  const authToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

  res.json({authToken, username})

  } catch (error) {
    console.error("LOGIN error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Delete USER ACCOUNT
getRouter.delete("/LOGOUT", async (req, res) => {
  try {
    const { username, password } = req.body;
    const loggedInUser = await users.findOne({ username });

    if (!loggedInUser || loggedInUser.password !== password) {
      return res.status(401).json({ message: "Invalid username/password" });
    }

    await users.findOneAndDelete({ username });
    res.status(200).json({ message: "Logged out and user deleted successfully" });
    console.log("Logout successful");
  } catch (error) {
    console.log("Logout error", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//  update DATA
getRouter.patch("/PATCH/:id", async (req, res) => {
  try {
    const { error, value } = validators.PostAndUpdateValidator(req.body);
    if (error) {
      return res.status(400).json(error.details);
    } else {
      const { id } = req.params;
      const updates = req.body;

      const updatedUser = await userDetails.findOneAndUpdate(
        { _id: id },
        { $set: updates },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ message: "Successfully updated user", updatedUser });
    }
  } catch (err) {
    console.error(err, "PATCH error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete DATA
getRouter.delete("/DELETE/:id", async (req, res) => {
  const { id: _id } = req.params;
  try {
    const deleteuser = await userDetails.findOneAndDelete({ _id });
    if (!deleteuser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "successfully Deleted user", deleteuser });
    console.log(deleteuser);
  } catch (err) {
    console.error(err, "DELETE error");
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { getRouter };
