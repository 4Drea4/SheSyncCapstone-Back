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
            message: 'You were registered successfully',
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
        
    } catch (error) {
        res.status(400).json({message: 'We could not register this user', error:error.message});
    }
});

//Post api users login route
router.post('/login', async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message:'Please enter your missing email or password'});
        }
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: 'Uh-oh looks like your email or password is incorrect'});
        }
        const correctPass = await user.isCorrectPassword(password);
        if(!correctPass) {
            return res.status(400).json({message: 'Uh-oh your email or password is incorrect'});
        }

        //payload the data between react and the server
        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username
        };
    }
})