const auth=require('../middleware/auth')
const express = require("express");
const router = express.Router();
const { Students, Note,validate} = require("../models/etudiant");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const store=require('store');

router.get('/',(req,res)=>res.send(req.body))

router.post('/addNote/:matricule',auth,async(req,res)=>{
  let etudiant = await Students.findOne({ matricule: req.params.matricule });
  if (!etudiant) return res.status(400).json({error:"Student doesn't existe ."});
  note=new Note({
    module:req.body.module,
    cc:req.body.cc,
    ci:req.body.ci,
    cf:req.body.cf,
    prof:req.body.prof,
    studentMatricule:req.body.studentMatricule,
  })
res.send(note) 
note.save()
  .then(()=> {
    res.status('200').send({message:"successfully"})
  }).catch(()=>{res.status('400').send({message:"error"})})

  })


  module.exports=router;