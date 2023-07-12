const express = require("express");
const router = express.Router();
const sequelize = require("../config/database");
const User = require("../model/user");
const user = require("../model/user");
const bcrypt = require("bcrypt");
const adminControl = require("../controllers/adminControl");

router.post("/", adminControl.postAdmin);
router.get("/", (req, res, next) => {
  user
    .findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
