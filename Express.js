const express = require('express');

const connectDB = require('./config/db');

const app = express();

connectDB();

//add middleware
app.use(express.json({extended:false}));

app.post('/',(req,res) =>  res.json({mes:'welcome to contact-keeper Api'}));

const PORT = process.env.PORT || 5000;


//Define Routes

app.use('/api/users',require('./route/Users'));
app.use('/api/auth',require('./route/Auth'));
app.use('/api/contact',require('./route/Contact'));





app.listen( process.env.PORT || 5000, function() {console.log(`server started on port ${PORT}`)});

