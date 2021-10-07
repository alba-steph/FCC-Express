var express = require("express");
var app = express();

console.log("Hello World");

// var myHandler = function (req, res) {
//   res.send("Hello Express");
// };
// app.get("/", myHandler);

var myHandler2 = function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
};
app.get("/", myHandler2);

app.use("/public", express.static(__dirname + "/public"));

var response = "Hello json";
if (process.env.MESSAGE_STYLE === "uppercase")
  response = response.toUpperCase();
var myHandler3 = function (req, res) {
  res.json({ message: response });
};
app.get("/json", myHandler3);

module.exports = app;
