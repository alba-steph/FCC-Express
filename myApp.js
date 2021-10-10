var bodyParser = require("body-parser");
require("dotenv").config();

var express = require("express");
var app = express();

console.log("Hello World");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// due to deprecated bodyParser, sub express in same code
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app
  .route("/name")
  .get((req, res) => {
    res.json({ name: req.query.first + " " + req.query.last });
  })
  .post((req, res) => {
    res.json({ name: req.body.first + " " + req.body.last });
  });

module.exports = app;
