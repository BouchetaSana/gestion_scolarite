const auth = require("../middleware/auth");
const { User, validate } = require("../models/user");
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


router.get("/",(req,res)=> {
  res.send({express:'sanaa'});
})

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
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email
  });
});

  
module.exports = router;
