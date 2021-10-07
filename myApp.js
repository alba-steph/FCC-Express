var express = require("express");
var app = express();

console.log("Hello World");

var myHandler = function (req, res) {
  res.send("Hello Express");
};
app.get("/", myHandler);

module.exports = app;
