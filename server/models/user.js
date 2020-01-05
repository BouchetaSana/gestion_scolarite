const mongoose  = require('mongoose')
const config = require("config");
const jwt = require("jsonwebtoken");
const store=require('store');
const joi=require('joi');


const UserSchema  = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        auto:true
    },

    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
   
    email:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength: 7,
        maxlength: 255
    },

    isAdmin: Boolean,

    tokens:[{
        token:{
            type:String,
            required: true
        }
    }]

});

UserSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myprivatekey')); 
    return token;
  }

function validate(user) {
    const schema = {
      name: joi
        .string()
        .min(3)
        .max(50),
      email: joi
        .string()
        .min(5)
        .max(255)
        .email()
        .required(),
      password: joi
        .string()
        .min(7)
        .max(255)
        .required(),
    };
    return joi.validate(user, schema);
}

const User = mongoose.model('User', UserSchema);

exports.User = User;
exports.validate=validate;