const express = require("express");
const router = express.Router();
const { Etudiant } = require("../models/etudiant");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("config");
const store=require('store');

/*router.post('/:user_id',(req,res)=>{
    Etudiant.findById(req.params.user_id,function(etud,err){
        if(err)
          res.send(err);
        else{
        const user=Etudiant()
        }
    })
})*/