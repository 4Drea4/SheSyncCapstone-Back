const express = require('expresss');
const router = express.Router();
const Project = require('../../models/Project');
const auth = require('../../utils/auth');

//create a project post  /api projects
router.post('/', auth, async (req,res)=> {
    try{
        const { name, description} = req.body;

    if(!name) {
        return res.status(400).json({message: 'You have to create a project name!'});
    }
    const project = await Project.create({
      name,
      description,
      user: req.user._id  
    });
    res.status(201).json(protect);
    } catch (error) {
        res.status(400).json({message: 'Uh-oh we could not create this project', error: error.message});
    }
});


