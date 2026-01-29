const mongoose = require('mongoose');


const projectSchmea = new mongoose.Schema(
    {
        name: {
            type:String, 
            required:true},
        description: {
            type:String
        },
        user:{
            type : mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        }
    },
    {timestamps:true}
);
const Project = mongoose.model('Project', projectSchema)
module.exports = Project;