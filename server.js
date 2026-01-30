const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connection');
const app =express();
const PORT =  process.env.PORT || 3001;
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/userRoutes');


//middleware
app.use(cors({origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

//test to make sure its running
app.get('/', (req,res)=> {
    res.send('My api is running successfully She Sync is in full effect');
});

//database connection
connectDB();


//mount routes
app.use('/projects' , projectRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})