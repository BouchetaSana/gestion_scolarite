const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("config");
const store=require('store');
const { validate } = require("../models/user");


router.post("/", async (req, res) => {
  const Account = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  validate(Account, async (err, value) => {
    if (err) throw err;
    await User.findOne(
      { username: req.body.username },
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
                        username: user.username,
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
    .catch(err => res.status(400).json({ msg: err.message }));
});
module.exports = router;
