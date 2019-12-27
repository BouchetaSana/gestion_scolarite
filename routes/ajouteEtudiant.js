const auth = require("../middleware/auth");
const { Etudiant, validate } = require("../models/etudiant");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose=require("mongoose");
var bodyParser = require("body-parser");
const store = require("store");



router.get("/current", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});


router.get("/",(req,res)=> {console.log('aaaa'); })

router.post("/", async(req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();
  console.log(user)
  const token = user.generateAuthToken();
  store.set("token",{ token: token })
  res.header("x-auth-token", token).send({
    _id: user._id,
    name: user.name,
    email: user.email
  });
});

  
module.exports = router;