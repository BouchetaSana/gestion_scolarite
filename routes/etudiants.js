const auth = require("../middleware/auth");
const { Students, validate ,Group} = require("../models/etudiant");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose=require("mongoose");
const store = require("store");


router.get("/",async(req,res)=> { 
  let students=await Students.find({})
  res.json(students)
   
})



router.post("/add", async(req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let etudiant = await Students.findOne({ email: req.body.email });
  if (etudiant) return res.status(400).json({error:"Student already registered."});

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
    res.json({status:user.FamilyName+ ' registred'})
    console.log(etudiant)
    res.send({
      matricule: etudiant.matricule,
      FamilyName: etudiant.FamilyName,
      FirstName:etudiant.FirstName,
      email: etudiant.email
    });

  });
 
});


//
router.delete("/remove",async(req,res)=>{
  let etudiant = await Students.findOne({ matricule: req.body.matricule });
  if (!etudiant) return res.status(400).json({error:"Student doesn't existe."});

  Students.deleteOne({matricule:req.body.matricule}).then(()=>{
    
    res.send(req.body.email+" is removed")
  })
})

router.put("/update/:matricule",async(req,res)=>{
  
  let newValue=new Students()
    newValue={$set:{
    matricule:req.body.matricule,
    FamilyName: req.body.FamilyName,
    FirstName:req.body.FirstName,
    password: req.body.password,
    email: req.body.email,
    dateBirth:req.body.dateBirth,
    level:req.body.level,
  }}
  Students.updateOne({ matricule: req.param.matricule },newValue).then(()=>{

    res.send("Student update")

  }).catch((err)=>console.log(err))
})


  
module.exports = router;
