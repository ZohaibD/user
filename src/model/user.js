const mongoose = require('mongoose')
require('mongoose-type-email');



mongoose.SchemaTypes.Email.defaults.message = 'Email address is galat ee'
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Enter your fisrt name']
    },
    lastName:{
        type:String,
        required:[true,"What is your last name"]
    },
    email:{
         type: mongoose.SchemaTypes.Email, 
         required: [true,'Enter the email']
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('user',UserSchema)