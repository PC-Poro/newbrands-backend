const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = 4000;
const mongoose = require("mongoose");
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/newbrands", {
  useNewUrlParser: true,
});
const router = express.Router();
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Connection with MongoDB was successful");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

app.post("/contact", function (req, res) {
  console.log(req.body);
  connection.collection("contact").insertOne(req.body, function (err, res) {
    if (err) throw err;
    console.log(res);
    connection.close();
  });
});

app.post("/newsletter", function (req, res) {
  console.log(req.body);
  connection.collection("newsletter").insertOne(req.body, function (err, res) {
    if (err) throw err;
    console.log(res);
    connection.close();
  });
});
