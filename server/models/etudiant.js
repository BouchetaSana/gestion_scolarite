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
    matricule:{
        type:Number,
        unique:true,
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
        unique:true,
        trim: true,
    

    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength: 7,

    },
    dateBirth:{
        type:Date,
        required:true,
    },
    level:{
        type:String,
        required:true,
    },
    group:Number,
    token:String,
    note:{
        type:Number,
    }

});




const groupSchema=new mongoose.Schema({
     id:{
        type:String,
        required:true
    },
     students:[{type:String}],
     level:{
        type:String,
        required:true
    },
    module:[{
        type:String
    }]
});


const noteSchema = new mongoose.Schema({
    module:{
       type:String,
       required:true  
   },
    cc:{type:Number, default:0,},
    ci:{type:Number, default:0,},
    cf:{type:Number, default:0,},

   prof:{
       type:String,
       required:true
   },
   studentMatricule:{
    type:Number,
    required:true
}

});


UserSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id }, config.get('myprivatekey')); 
    return token;
  }

  
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
      matricule: joi
        .number()
        .min(8)
        .required(),
      dateBirth: joi
        .date()
        .required(),
      level:joi
         .required(),
    };
    return joi.validate(etudiant, schema);
};
const Students = mongoose.model('Students',UserSchema);
const Group=mongoose.model('Groups',groupSchema);
const Note=mongoose.model('Notes',noteSchema);
module.exports.Students=Students;
module.exports.Group=Group;
module.exports.Note=Note;
exports.validate=validate;
