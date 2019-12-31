const express = require("express");
const router = express.Router();
const { Students, Note,validate} = require("../models/etudiant");
const { User } = require("../models/user");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("config");
const store=require('store');

router.post('/ajouteNote',async(req,res)=>{
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let etudiant = await Students.findOne({ matricule: req.body.matricule });
  if (!etudiant) return res.status(400).json({error:"Student doesn't existe ."});
  etudiant.Note

  })