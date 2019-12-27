const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const store = require("store");



router.post('/', async (req, res)=> {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).send("Invalid username or password ");
        const validPassword = await bcrypt.compare(req.body.password, user.password);
         if (validPassword ){
            res      
            .status(200)
            
            const token = user.generateAuthToken();
            store.set("token", { token: token });
            res.header("x-auth-token", token).send({
              _id: user._id,
              name: user.name,
              email: user.email
            });
           }
           else{
             return res.status(400).send("Invalid  password ");
           }      
        }
    )
      
module.exports=router;