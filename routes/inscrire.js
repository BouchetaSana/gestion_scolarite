const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const mongoose=require("mongoose");
const MongoClient = require('mongodb').MongoClient;
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("config");
const store=require('store');


router.get("/",()=> console.log('aaaa'))

router.post("/", (req, res) => {
  bcrypt.hash(req.body.password,10,(err,hash)=>{
    if (err){
      res.status('500').json({
        error:err
      })
    }else{
      const user = new User( {
        _id:new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password:hash
      });
      res.json(user)
      user.save()
      .then((result)=>{
        console.log(result)
        console.log('save user')
        res.status('201').json({
          message:"user created"
        })
      })
      .catch((err)=>{      
        console.log('err'+err)
      })
    }
    
  })

  /*

  validate(Account, async (err, value) => {
    if (err) throw err;
    await User.findOne(
      { name: req.body.name },
      async (err, data) => {
        if (err) throw err;
        if (!data) {
          const user = User(Account);
          await bcrypt.hash(user.password, 10, async (err, hash) => {
            if (err) throw err;
            user.password = hash;
            await user.save((err, user) => {
              if (err) throw err;
              jwt.sign(
                {
                  id: user._id,
                },
                config.jwtPrivateKey,
                (err, token) => {
                  res.json({
                    data: {
                      token: token,
                      user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                      }
                    }
                  });
                }
              );
              console.log("User added");
            });
          });
        } else {
          res.status(400).json({ msg: "User Already Registered" });
        }
      }
    ).catch(err => res.status(400).json({ msg: err.message }));
  })
    .catch(err => {
      res.status(400).json({ msg: err.message });
    })
    .catch(err => res.status(400).json({ msg: err.message }));*/
})  
module.exports = router;
