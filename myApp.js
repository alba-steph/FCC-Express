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

module.exports = app;
