const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/connection');
const app =express();

//middleware
app.use(cors({origin: process.env.CLIENT_ORIGIN })
)