const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Project');
const auth = require('../utils/auth');

//Post api projects project id tasks create tasks
router.post('/project/:projectId', auth ,async (req, res,) => {
try{
    const {title, description, status} = req.body;

    if(!title) {
        return res.status(400).json({message:'Uh-oh you need a title'});
    }
    //find the project first
    const project = await Project.findOne({
        _id: req.params.projectId, 
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

//Get tasks for a project
router.get('/project/:projectId', auth, async (req,res)=>{
    try{
        //confirm user authorization again
        const project = await Project.findOne({
            _id:req.params.projectId,
            user: req.user._id,
        });

        if(!project) {
            return res.status(403).json({message: 'This is not your project '});
        }
        const tasks = await Task.find({project:project._id}).sort({createdAt: -1});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({message: 'Could not retrieve these tasks', error: error.message});
    }
});

//update a task put/tasks/taskId

router.put('/:taskId', auth, async (req,res)=> {
    try{
        const task = await Task.findById(req.params.taskId);

        if(!task) {
            return res.status(404).json({message: 'Could not find this task'});
        }
        //need to find the project thats a parent of this task
        const project = await Project.findOne({
            _id:task.project,
            user: req.user._id,
        });

        if(!project) {
            return res.status(403).json({message: 'You can not do that hon, this is not your project'});
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, {new: true, runValidators: true});
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({
            message: 'Could not update this task', error: error.message
        });
    }
});
//delete the task /tasks/:taskId
router.delete('/:taskId', auth, async (req,res)=> {

    try{
        const task = await Task.findById(req.params.taskId);

        if(!task) {
            return res.status(404).json({message: 'Could not find this task'})
        }
        const project = await Project.findOne({
            _id: task.project,
            user: req.user._id,
        });

        if (!project){
            return res.status(403).json({message : 'Uh-oh you do not own this project'});
        }
        await Task.findByIdAndDelete(req.params.taskId);

        res.json({message:'You successfully deleted this task'});
    } catch (error) {
        res.status(400).json({
            message: 'Could not delete this task', error:error.message
        });
    }
});

module.exports = router;