const mongoose  = require('mongoose')
const validator = require('validator')
const config = require("config");
const jwt = require("jsonwebtoken");
const store=require('store');
const joi=require('joi');
//"start-with-api": "concurrently \"react-scripts start\" \" nodemon server.js\"",

const UserSchema  = new mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        auto:true

    },

    nom:{
        type: String,
        required: true,
        trim: true,
    },
    prenom:{
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
    motDePasse:{
        type:String,
        required:true,
        trim:true,
        minlength: 7,

    },
    naissance:Date,
    groupe:Number,
    type:String,

    note:[String],

    
    /*tokens:[{
        token:{
            type:String,
            required: true
        }
    }]*/

});

const Etudiant = mongoose.model('Etudiant',UserSchema);
module.exports=Etudiant;
