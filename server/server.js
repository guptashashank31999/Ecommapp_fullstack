const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require('./routes/authRoute');
const categoryRoute = require('./routes/categoryRoute');
const formidableMiddleware = require('express-formidable');

const productsRoute  = require('./routes/productRoute');
require("./config/db");
require('dotenv').config()

// const dotenv = require('dotenv');
// const morgan = require('morgan');
// const connectDB = require('./config/db.js')
// import express  from 'express';
// import dotenv from 'dotenv'
// import morgan from 'morgan';
// import connectDB from './config/db.js';

//Configure env
// dotenv.config();


//get express function
const app = express();

//Middleware
//  app.use(morgan('dev'))
app.use(cors());

//Photo and file upload middlewares
// app.use(formidableMiddleware());

//Import json
app.use(express.json());
// app.use(morgan());
//Database connection


//ALl ROUTES
app.use('/api/v1/auth', authRouter);

//Category route
app.use('/api/v1/category', categoryRoute)

//Product route
app.use('/api/v1/products' , productsRoute)

// connectDB();
app.get('/',(req, res)=>{
    res.send({
        message : 'Welcome to ecommerce'
    })
});




const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT} in mode Development`)
})