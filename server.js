const querystring = require('querystring');
const express = require("express");
const app = express();
const config = require("config");
const store=require("store");
const inscrire = require("./routes/inscrire");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());

//cors
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use("/api/inscrire", inscrire);
app.listen(8000);
