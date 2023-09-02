const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user"); 

router.post("/", (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        const userId = existingUser._id;
        const secretKey = "my_secret_key";
        const premiumUser = existingUser.isPremiumUser;

        function generateAccessToken(id) {
          return jwt.sign({ userId, premiumUser }, secretKey);
        }

        bcrypt.compare(password, existingUser.password, (err, result) => {
          if (err) {
            return res.status(400).json("Something went wrong");
          }
          if (result) {
            return res.status(200).json({
              message: "Logged in successfully",
              token: generateAccessToken(existingUser.id),
            });
          }
          return res.status(401).json({ message: "Authentication failed" });
        });
      } else {
        return res.status(404).json({ message: "User does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Server error" });
    });
});

module.exports = router;
