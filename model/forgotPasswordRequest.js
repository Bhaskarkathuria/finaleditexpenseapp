const mongoose = require("mongoose");

const forgotPasswordRequestSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userid: {
    type: Number,
    required: true,
  },
  isactive: {
    type: Boolean,
    required: true,
  },
});

const ForgotPasswordRequest = mongoose.model(
  "ForgotPasswordRequest",
  forgotPasswordRequestSchema
);

module.exports = ForgotPasswordRequest;

// const Sequelize=require('sequelize');
// const sequelize=require('../config/database');

// const User = sequelize.define("forgotPasswordRequest", {
//   id: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     primaryKey: true,
//   },
//   userid: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   isactive: {
//     type: Sequelize.BOOLEAN,
//     allowNull: false,
//   },
// });

// module.exports = User;
