const mongoose  = require('mongoose')
const validator = require('validator')
const config = require("config");
const jwt = require("jsonwebtoken");
const store=require('store');
const joi=require('joi');

const UserSchema  = new mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        auto:true

    },

    name:{
        type: String,
        required: true,
        trim: true
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

    user_type:String,
    groupe:Number,
    note:{type:[Number]},

    /*tokens:[{
        token:{
            type:String,
            required: true
        }
    }]*/

});

const Etudiant = mongoose.model('Etudiant',UserSchema);
module.exports=Etudiant;
