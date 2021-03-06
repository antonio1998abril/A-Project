require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
// Call all Routes
const routes = require("./Routes/routes");
// Connect to MongoAtlas
const mongoose = require("mongoose");
mongoose.set("runValidators", true);
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected Successfully.");
  })
  .catch((err) => {
    console.log("Database connection failed.", err);
  });
mongoose.connection;
//get data from inputs of my frontend
app.use(express.json());
//get body entries
app.use(
  express.urlencoded({
    extended: true,
  })
);
//used to on jsonwebtoken cookie
app.use(cookieParser());
app.use('/api',routes.user)

// catch Error
app.use(function(err,res){
  res.json({error:err.message}) 
})

const PORT = 5000;
app.listen(PORT, () => console.log("Server Activated Correctly"));
