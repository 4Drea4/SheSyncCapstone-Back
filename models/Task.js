const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String
    },
    status: {
        type: String,
        enum: ['todo', 'Working On It', 'Woohoo Done did it!'],
        default:'todo',
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required: true,
    },
    },
    {timestamps:true},
);
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;