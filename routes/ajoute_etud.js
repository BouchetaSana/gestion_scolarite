const express = require("express");
const router = express.Router();
const { Etudiant } = require("../models/etudiant");
const bcrypt = require("bcrypt");
const mongoose=require("mongoose");
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("config");
const store=require('store');


router.get("/",()=> console.log('aaaa'))

router.post("/", async (req, res) => {
  bcrypt.hash(req.body.password,10,(err,hash)=>{
    if (err){
      res.status('500').json({
        error:err
      })
    }else{
      const etudiant = new Etudiant( {
        _id:new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password:hash
      });
      res.json(user)
      user.save()
      .then((result)=>{
        console.log(etudiant)
        console.log('save user')
        res.status('201').json({
          message:"etudaint saved"
        })
      })
      .catch((err)=>{      
        console.log('err'+err)
      })
    }
  })
})

module.exports=router;
