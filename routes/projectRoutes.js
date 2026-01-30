const express = require('express');
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
    res.status(201).json(project);
    } catch (error) {
        res.status(400).json({message: 'Uh-oh we could not create this project', error: error.message});
    }
});
//retrieve my projects with a GET request
router.get('/', auth, async (req,res) => {
    try{
        const projects = await Project.find({user: req.user._id }).sort({createdAt: -1});
        res.json(projects);
    } catch (error) {
        res.status(500).json({message: 'Could not retrieve your projects', error: error.message});
    }
});


//user can get projects that are theirs
router.get('/:id', auth, async (req, res) => {
    try{
        const project = await Project.findOne({_id: req.params.id, user:req.user._id });
        if (!project) return res.status(404).json({message: 'Could not find this project'});
        res.json(project);
    } catch (error){
        res.status(400).json({message: 'Uh-oh wrong project id', error: error.message});
    }
});
//edit projects that belong to the user PUT api/projects/:id
router.put('/:id', auth, async (req,res)=> {
    try{
        const updated = await Project.findOneAndUpdate(
            {_id: req.params.id,
                user:req.user._id},
                req.body,
                {new:true, runValidators:true}
        );
        if (!updated) return res.status(404).json({message: 'Uh-oh we couldnt find this project'});

        res.json(updated);
    } catch (error) {
        res.status(400).json({message: 'We could not update this project', error: error.message});
    }
});

//delete
    router.delete('/:id' , auth, async (req,res) => {
        try{
            const deleted = await Project.findOneAndDelete({_id: req.params.id ,user:req.user._id });
            if(!deleted) return res.status(404).json({message: 'Uh oh couldnt find this project'});
            res.json({message: 'Project delted successfully'});
        } catch (error) {
            res.status(400).json({message: 'We could not delete this project', error:error.message});
        }
    });
    module.exports = router; 
