const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type:String, 
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        match: [/.+@.+\..+/, 'You need a valid email'],
        lowercase:true,
        trime:true
    },
    password: {
        type:String,
        required:true,
        minlength: 7
    }

    //hashbrown the password
})