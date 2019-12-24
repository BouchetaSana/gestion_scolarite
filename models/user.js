const mongoose  = require('mongoose')
const validator = require('validator')
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

    tokens:[{
        token:{
            type:String,
            required: true
        }
    }]

});

UserSchema.methods={
    authenticate:function(password){
        return passwordHash.verify(password,this.password)
    },
    getToken : function(){
        const token = jwt.sign(
            { 
            _id: this._id 
            }, 
            config.jwtPrivateKey);    
        return token
    }
}

function validate(compte, callback) {
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
        .min(3)
        .max(255)
        .required(),
    };
    return joi.validate(compte, schema, callback);
}

const User = mongoose.model('User', UserSchema);

module.exports.User = User;
module.exports.validate=validate;