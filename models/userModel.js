const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String,unique:true, required:true, validate: [validator.isEmail, 'Please enter a valid address']},
    password: {type: String, required: true},
    name: {type: String},
    profilePic: {type: String, default: "default.jpg"},
    role: {type: String, enum: ["admin","user"], default:"user"},
    phone:{type: String, validate:[validator.isMobilePhone, 'Please eneter a valid phone number']},
    createdAt:{type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now},
    
})

module.exports = mongoose.model('User', userSchema);