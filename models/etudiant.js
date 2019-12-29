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
    matrcule:{
        type:Number,
        required:true,
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
    niveau:{
        type:Number,
        required:true,
    },
    group:Number,
    token:String

});




const groupSchema=new mongoose.Schema({
     id:{
        type:String,
        required:true
    },
     etudiants:[{type:String}],
     niveau:{
        type:String,
        required:true
    },
    matiere:[{
        type:String
    }]
});


const noteSchema = new mongoose.Schema({
    matiere:{
       type:String,
       required:true  
   },
    note:{
       cc:{type:Number, default:0,},
       ci:{type:Number, default:0,},
       cf:{type:Number, default:0,},
   },
   prof:{
       type:String,
       required:true
   },
   etudiant:{
    type:String,
    required:true
}

});

function validate(etudiant) {
    const schema = {
      FirstName: joi
        .string()
        .min(3)
        .max(50)
        .required(),
      FamilyName: joi
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
    return joi.validate(etudiant, schema);
};
const Etudiant = mongoose.model('Students',UserSchema);
const Group=mongoose.model('Groups',groupSchema);
const Note=mongoose.model('Notes',noteSchema);
module.exports.Etudiant=Etudiant;
module.exports.Group=Group;
module.exports.Note=Note;
exports.validate=validate;
