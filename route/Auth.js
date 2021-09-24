const express = require('express');

const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');
const {check,validationResult} = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/Auth');

router.get('/', auth, async(req,res) => {
    try {
          const user = await  User.findById(req.user.id).select('-password');
          res.json(user);

    }
       catch (error) {  res.status(400).json({message:'User already exist'})};
       
 });



router.post('/', [
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'please name is required').exists()
], async (req,res) =>  {
     const errors = validationResult(req);
if (!errors.isEmpty()) { 
   return  res.status(400).json({errors:errors.array()})
}

const {email,password} = req.body;
try {
    let user =  await User.findOne({email});
     if (!user) return res.status(404).json({message:"incorrect credentials"});
     
     
     const isMatch = await bcrypt.compare(password,user.password);

     if(!isMatch)  return res.status(404).json({message:"incorrect credentials"});
     
     const payload = {
        user:{
            id:user.id
        }
    }
   

    //put the user id (payload) in the token
    jwt.sign(payload,config.get('jwtSecret'), {
       expiresIn:360000,
    }, (err,token) => { if (err)  throw err; 
       res.json({token});
   });
   


  //end of try block   
}
catch (error) {
    console.log({mes:error.message})
    res.status(500).json({message:"server error"});
}
});

module.exports = router; 