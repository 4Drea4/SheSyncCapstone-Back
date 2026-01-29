const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

//post api users register route
router.post('/register' ,async (req,res) => {
    try {
        const {username, email, password} = req.body;

        //validate info
        if(!username || !email || !password) {
            return res.status(400).json({message: 'The username, email, or password is missing' });
        }
        //check to see if email already exists
        const exists = await User.findOne({email});
        if (exists) {
            return res.status(400).json({message: 'Uh-oh this email address is already being used'});
        }
        //if not create a new user and hashbrown 
        const newUser = await User.create({username,email,password});

        //return the user but dont return the hashbrowned password
        return res.status(201).json({
            message: 'User'
        };
        message: 'This user was registered successfully'
    } catch (error) {
        res.status(400).json({message: 'We could not register this user', error:error.message});
    }
});