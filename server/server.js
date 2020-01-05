const config=require("config")
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require('path');
const signIn = require("./routes/signIn");
const login=require('./routes/login');
const db=require('./db/db')
const students=require('./routes/etudiants');
const notes=require('./routes/notes')

app.use(bodyParser.json());
app.use(express.json());
if (!config.get("myprivatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

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
app.use("/notes",notes)

app.listen('8000',()=>console.log('server in port 8000'));
