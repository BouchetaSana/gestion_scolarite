const config=require("config")
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require('path');
const signIn = require("./routes/signIn");
const login=require('./routes/login');
const students=require('./routes/etudiants');
const db=require("./db/db")
const ejs =require("ejs");

app.use(bodyParser.json());
app.use(express.json());
if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}
 /*  
app.use(session({
  secret: "gestion_scolarite",
  resave: true,
  saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
 
.use(function(request, response, next) {
 
  if (typeof request.session.logged === "undefined") {
      request.session.logged = false;
      return response.redirect("/inscrire");
  }
 
  if (request.session.logged === true)
      return response.redirect("/src");
 
  next();
})

app.set("view engine","ejs");

app.get('/',(req,res)=>{
  res.sendfile( __dirname+"/src");
});
*/
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


app.use("/signIn", signIn);
app.use("/login",login);
app.use("/students",students)

app.listen('8000',()=>console.log('server in port 8000'));
