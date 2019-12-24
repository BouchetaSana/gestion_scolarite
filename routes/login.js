const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const store = require("store");

router.post('/', function (req, res) {
  const admin =  User.find({ email: req.body.email })
    .then(()=>{
        if (!admin)
         return res.status(400).send("Invalid username or password ");
         bcrypt.compare(req.body.password, admin.password,function(err,result){
           if (result === true){
            res      
            .status(200)
            .end(admin)
           }
           else       
             return res.status(400).send("Invalid  password ");
          });
        }
    ).catch((err)=>console.log('error in compare password'));
  })
    /*router.post('/', function (req, res) {
        User.find({name:req.body.name,password:req.body.password}).then(function(user){
          res.json(user);
          console.log('existe user');

        })
       })*/
      
module.exports=router;