const querystring = require('querystring');
const express = require("express");
const app = express();
const config = require("config");
const store=require("store");
const inscrire = require("./routes/inscrire");
var bodyParser = require("body-parser");
const notes=require("./routes/notes")
const db=require("./db/db")
const ejs =require("ejs")

app.use(bodyParser.json());
app.use(express.json());
app.get('/',(req,res)=>{
  res.sendFile( __dirname+'/public/index.html');
});
app.set("view engine","ejs");

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

app.use("/inscrire", inscrire);

module.exports=app;