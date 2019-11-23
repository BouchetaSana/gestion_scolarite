const http=require('http')
const querystring = require('querystring');
const express = require("express");
const app = express();
const config = require("config");
const store=require("store");
const inscrire = require("./routes/inscrire");
var bodyParser = require("body-parser");
const notes=require("./routes/notes")
const db=require("./db/db")

app.use(bodyParser.json());
app.use(express.json());

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


app.use("/api/inscrire", inscrire)
http.createServer(console.log('server')).listen(3000)
