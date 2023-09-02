const Sequelize = require("sequelize");
const sequelize = require("./config/database");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const AWS = require("aws-sdk");
const path = require("path");
const mongoose = require('mongoose');



const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/login");
const expenseRoutes = require("./routes/expense");
const premiumRoutes = require("./routes/premium");
const transactionStatusRoutes = require("./routes/transactionStatus");
const premiumfeaturesRoutes = require("./routes/premiumfeatures");
const forgotpasswordRoutes = require("./routes/forgotpassword");

const userinfo = require("./model/user");
const expense = require("./model/expensemodel");
const orders = require("./model/orders");
const forgotPasswordRequest = require("./model/forgotPasswordRequest");

app.use(bodyParser.json());
app.use(cors());

// app.get("/", (req, res, next) => {
//   res.send("Server listening on port 5000");
// });

 app.use("/signup", adminRoutes);
 app.use("/login", userRoutes);
 app.use("/expenses", expenseRoutes);
// app.use("/purchasePremium", premiumRoutes);
// app.use("/trasactionstatus", transactionStatusRoutes);
// app.use("/premiumfeatures", premiumfeaturesRoutes);
// app.use("/passwordrequest", forgotpasswordRoutes);
// app.use("/expenses", expenseRoutes);

app.use((req, res) => {
  console.log(req.url);
  res.sendFile(path.join(__dirname, `public/${req.url}`));
});
//http://13.50.219.177/login/login.html

// http: userinfo.hasMany(expense);
// expense.belongsTo(userinfo);

// userinfo.hasMany(orders);`
// orders.belongsTo(userinfo);

// userinfo.hasMany(forgotPasswordRequest);
// forgotPasswordRequest.belongsTo(userinfo);

mongoose.connect(
  "mongodb+srv://bhaskar712:RaNJilG3WRlTGH3z@expensetracker.hbfk6fy.mongodb.net/expenseTracker?retryWrites=true&w=majority"
)
.then((result)=>{
  // console.log(result)
  app.listen(3000)
})
.catch((err)=>{
  console.log(err)
})




// sequelize
//   .sync()
//   //  .sync({force: true})
//   .then((res) => {
//     // const hostname = "127.0.0.1";
//     // const port = 5000;
//     // app.listen(port, hostname, () => {
//     //   console.log(`Server running at http://${hostname}:${port}/`);
//     // });
//     app.listen(5000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
