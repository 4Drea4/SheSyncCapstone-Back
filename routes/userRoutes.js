const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

//post api users register route
router.post('/register' ,async (req,res) => {
    try {
        const {username, email, password} = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({message: 'The username, email, or password is missing' });
        }
        const exists = await User.findOne({email});
        if (exists) {
            return res.status(400).json({message: 'Uh-oh this email address is already being used'});
        }
        const newUser = await User.create({username,email,password});
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message: 'We could not register this user', error:error.message});
    }
});