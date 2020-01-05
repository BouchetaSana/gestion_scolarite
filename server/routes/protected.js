const express = require('express');
//create the express router that will have all endpoints
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user')
const bcrypt = require('bcryptjs');const checkAuth = require('../middleware/auth');

router.get('/protected', checkAuth, (req, res, next)=> {
  res.status(200).json({
    message: 'Welcome, your email is ' + req.userData.email,
    user: req.userData,
    errors: [],
  })
})

module.exports = router;