const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const downloadSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("Download", downloadSchema);




// const Sequelize = require("sequelize");
// const sequelize = require("../config/database");

// const Download = sequelize.define("Download", {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//     autoIncrement: true,
//   },
//   link: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });
// module.exports = Download;
