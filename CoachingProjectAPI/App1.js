import express from 'express';
import bodyParser from 'body-parser';


const app = express();


import Router from './router1.js';  


app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true })); 


app.use('/category', Router);


app.listen(3003);

console.log("Server is running on http://localhost:3003");

