require("dotenv").config();

var express = require("express");
var app = express();

console.log("Hello World");

var myMiddleware = function (req, res, next) {
  console.log(req.method, req.path, "-", req.ip);
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

app.get(
  "/now",
  function (req, res, next) {
    req.time = Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.route("/name").get((req, res) => {
  res.json({ name: req.query.first + " " + req.query.last });
});

module.exports = app;
