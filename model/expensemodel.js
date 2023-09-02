const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  income: {
    type: String,
    required: true,
  },
  expense: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Expense", expenseSchema);



// const Sequelize = require("sequelize");

// const sequelize = require("../config/database");

// const User = sequelize.define("expense", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   date: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   amount: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   category: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   income: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   expense: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = User;
