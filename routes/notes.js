const express = require("express");
const router = express.Router();
const { Etudiant, Note,validate} = require("../models/etudiant");
const { User } = require("../models/user");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("config");
const store=require('store');

router.post('/ajouteNote',(req,res)=>{
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  etudiant=new Etudiant;
  const etudiant=await Etudiant.findById(req.params.user_id)
       if(!etudaint)
          res.send(err);
        else{
        const note=new Note({
          matiere=req.body.matiere,
          prof=req.body.prof
        })
        
    }
  })