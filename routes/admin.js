const express = require("express");
const router = express.Router();
//const sequelize = require("../config/database");
const User = require("../model/user");
const bcrypt = require("bcrypt");

// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const User = require("./models/User"); // Assuming you have a User model defined

router.post("/", (req, res, next) => {
  console.log(req.body);
  const email = req.body.email;

  User.findOne({ email: email }).then((existingUser) => {
    if (existingUser) {
      const errormessage = "Email already exists";
      res.status(400).send(errormessage);
    } else {
      const password = req.body.password;
      const saltRounds = 10;

      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error during password hashing");
        }

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          isPremiumuser: false,
        });

        newUser
          .save()
          .then((result) => {
            return res.json({ success: true, message: "Sign up successful" });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).send("Error during user creation");
          });
      });
    }
  });
});


router.get("/", (req, res, next) => {
  User.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error fetching users");
    });
});

module.exports = router;
