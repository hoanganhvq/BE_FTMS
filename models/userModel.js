const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    email: {type: String, validate: [validator.isEmail, 'Vui long nhap lai dung dinh dang email']},
    profilePic: {type: String, default: "default.jpg"},
    role: {type: String, enum: ["admin","user"], default:"user"},
    phone:{type: String, validate:[validator.isMobilePhone, 'Vui long nha lai dung dinh dang so dien thoai']},
    createdAt:{type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now},
    
})

module.exports = mongoose.model('User', userSchema);