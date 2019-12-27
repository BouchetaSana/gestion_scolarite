const mongoose  = require('mongoose'); 
const config = require("config");
const jwt = require("jsonwebtoken");
const store=require('store');
const joi=require('joi');

const UserSchema  = new mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        auto:true

    },

    FamilyName:{
        type: String,
        required: true,
        trim: true,
    },
    FirstName:{
        type: String,
        required: true,
        trim: true,
    },
   
    email:{
        type: String,
        required: true,
        unique:true,
        trim: true,
    

    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength: 7,

    },
    birthday:Date,
    group:Number,
    token:String

});

function validate(user) {
    const schema = {
      name: joi
        .string()
        .min(3)
        .max(50)
        .required(),
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

const Etudiant = mongoose.model('Etudiant',UserSchema);
module.exports.Etudiant=Etudiant;
exports.validate=validate;
