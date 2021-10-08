require("dotenv").config();

var express = require("express");
var app = express();

console.log("Hello World");

var myMiddleware = function (req, res, next) {
  console.log(req.method, req.path, " -", req.ip);
  next();
};
app.use(myMiddleware);

// var myHandler = function (req, res) {
//   res.send("Hello Express");
// };
// app.get("/", myHandler);

var myHandler2 = function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
};
app.get("/", myHandler2);

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  process.env.MESSAGE_STYLE === "uppercase"
    ? res.json({ message: "HELLO JSON" })
    : res.json({ message: "Hello json" });
});

module.exports = app;
