const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../utils/auth');
const auth = require('../utils/auth');

//Pots api projects project id tasks create tasks
router.post('/:projectId/tasks', auth ,async (req, res,) => {
try{
    const {title, description, status} = req.body;

    if(!title) {
        return res.status(400).json({message:'Uh-oh you need a title'});
    }
    //find the project first
    const project = await Project.findOne({
        id: req.params.projectId, 
        user:req.user._id,
    });
    //check user because project belongs to user 

    if (!project) {
        return res.status(403).json({message: 'You can not do this, you are not the owner of this project'})
    }
    //create a task
    const task = await Task.create({
        title,
        description,
        status: status || 'todo',
        project:project._id,
    });
    //error
     res.status(201).json(task);
    } catch (error) {
     res.status(400).json({
        message: 'We could not create this task', error:error.message
     });
 }
});

