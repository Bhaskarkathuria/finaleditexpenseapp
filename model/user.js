const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isPremiumuser: {
    type: Boolean,
    required: true,
  },
  totalexpense: {
    type: Number,
    required: true,
    default: 0,
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// const Sequelize=require('sequelize');
// const sequelize=require('../config/database');

// const User=sequelize.define('userInfo',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false,
//         unique:true
//     },
//     password:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     isPremiumuser:{
//         type:Sequelize.BOOLEAN,
//         allowNull:false

//     },
//      totalexpense:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         defaultValue:0
//     }
// });

// module.exports=User;
