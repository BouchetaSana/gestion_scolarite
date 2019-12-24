const http=require('http')
const querystring = require('querystring');
const express = require("express");
const app = express();
const config = require("config");
const store=require("store");
var bodyParser = require("body-parser");
const notes=require("./routes/notes")
const inscrire = require("./routes/inscrire");
const login=require('./routes/login')
const db=require("./db/db")
const ejs =require("ejs");
const session = require("express-session");
   
app.use(session({
  secret: "gestion_scolarite",
  resave: true,
  saveUninitialized: true
}))
 
.use(function(request, response, next) {
 
  if (typeof request.session.logged === "undefined") {
      request.session.logged = false;
      return response.redirect("/inscrire");
  }
 
  if (request.session.logged === true)
      return response.redirect("/");
 
  next();
})
app.use(bodyParser.json());
app.use(express.json());
app.get('/',(req,res)=>{
  res.sendFile( __dirname+'/public');
});
//app.set("view engine","ejs");

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
app.use("/login",login)

app.listen('8000',()=>console.log('server in port 8000'));
