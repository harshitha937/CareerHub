const express=require("express");
const cors= require('cors');
const mongoose = require('mongoose');
const path=require('path');
const cookieParser = require('cookie-parser');

//utils
const connectDB = require('./config/db.js');
const  userRoutes = require('./routes/userRoutes.js');
const jobRoutes=require('./routes/jobRoutes.js')
const applicationRoutes = require('./routes/applicationRoutes');
const contactRoutes = require('./routes/contactRoutes');

require('dotenv').config();
const PORT= process.env.PORT || 5000;

connectDB();

const app =express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

 console.log('userRoutes:', typeof userRoutes);         // should be 'function'
console.log('jobRoutes:', typeof jobRoutes);           // should be 'function'
console.log('applicationRoutes:', typeof applicationRoutes); // should be 'function'
console.log('contactRoutes:', typeof contactRoutes);   // should be 'function'

app.use('/auth',userRoutes);
app.use('/jobs',jobRoutes);
app.use('/applications', applicationRoutes);
app.use('/contact', contactRoutes);
app.use(
  '/uploads',
  express.static(path.join(__dirname, '..', 'uploads'))
);


 app.listen(PORT,()=>{
    console.log(`Server is listening at ${PORT}.`);
 });
