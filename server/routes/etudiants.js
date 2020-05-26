const auth = require("../middleware/auth");
const { Students, validate ,Group} = require("../models/etudiant");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose=require("mongoose");

router.get("/",auth,async(req,res)=> { 
  let students=await Students.find({})
  res.json(students)
   
})



router.post("/add",auth ,async(req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let etudiant = await Students.findOne({ matricule: req.body.matricule });
  if (etudiant) return res.status(400).json({message:"Student already registered."});

   etudiant = new Students({
    matricule:req.body.matricule,
    FamilyName: req.body.FamilyName,
    FirstName:req.body.FirstName,
    password: req.body.password,
    email: req.body.email,
    dateBirth:req.body.dateBirth,
    level:req.body.level,
  });
  etudiant.password = await bcrypt.hash(etudiant.password, 10);
  etudiant.save().then((user)=>{
    res.json({message:user.FamilyName+ ' registred'})
    console.log(etudiant)
    res.status(201).send({
      matricule: etudiant.matricule,
      FamilyName: etudiant.FamilyName,
      FirstName:etudiant.FirstName,
      email: etudiant.email 
    }); 

  }).catch((res)=>{res.send({err:"error in save "})});
 
});


//
router.delete("/remove",auth,async(req,res)=>{
  let etudiant = await Students.findOne({ matricule: req.body.matricule });
  if (!etudiant) return res.status(400).json({error:"Student doesn't existe."});

  Students.deleteOne({matricule:req.body.matricule}).then(()=>{
    
    res.send(req.body.email+" is removed")
  })
})

router.post("/update/:matricule",async(req,res)=>{
  
  let newValue=new Students()
    newValue={
    matricule:req.body.matricule,
    FamilyName: req.body.FamilyName,
    FirstName:req.body.FirstName,
    password: req.body.password,
    email: req.body.email,
    dateBirth:req.body.dateBirth,
    level:req.body.level,
  }
  student = await Students.find({ matricule: req.param.matricule })
  if (!student) return res.status("400").send({err:"student not found"})
  else {
    newValue.save().then(()=>{
      res.status("201").send("Student update")
    }).catch((err)=> res.send({err:"error in save modification"}))
  }
  })
  
module.exports = router;
