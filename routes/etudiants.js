const auth = require("../middleware/auth");
const { Etudiant, validate ,Group} = require("../models/etudiant");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose=require("mongoose");
const store = require("store");


router.get("/",(req,res)=> { 
   
})

router.post("/ajouter", async(req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let etudiant = await Etudiant.findOne({ email: req.body.email });
  if (etudiant) return res.status(400).json({error:"Student already registered."});

  etudiant = new Etudiant({
    matricule:req.body.matricule,
    FamilyName: req.body.FamilyName,
    FirstName:req.body.FirstName,
    password: req.body.password,
    email: req.body.email,
    birthday:req.body.birthday,
    niveau:req.body.niveau,
    group:req.body.group
  });
  etudiant.password = await bcrypt.hash(etudiant.password, 10);
  etudiant.save().then((user)=>{
    res.json({status:user.email+ ' registred'})
  });
  console.log(etudiant)
  const token = etudiant.generateAuthToken();
  store.set("token",{ token: token })
  res.header("x-auth-token", token).send({
    matricule: etudiant.matricule,
    FamilyName: etudiant.FamilyName,
    FirstName:etudiant.FirstName,
    email: etudiant.email
  });
});

router

  
module.exports = router;
