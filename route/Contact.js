const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/Auth');

//get d user contact, by default it returns empty array
router.get('/', auth, async (req,res) => {
    try {
         const contact = await  Contact.find({user: req.user.id}).sort({date:-1});
         res.json(contact);
    }

    catch (error) {
        res.status(500).json({message:'Server error'});
    }
});
// add a user contact
router.post('/', [auth,[
    check('name', 'please name is required').not().isEmpty(),  
]], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
       return  res.status(400).json({errors:errors.array()})
    }
   
    const {name,email,phone,type} = req.body;

    try {
         const newContact = new Contact({
             name,
             email,
             phone,
             type,
             user:req.user.id
         });

         const contact = await newContact.save();
         res.json(contact);
    }

    catch (error) {
        res.status(500).json({message:"server error"});
    }
}); 


//route for update
router.put('/:id', [auth, [
    check('name', 'Name Required').not().isEmpty(),
    check('phone', 'Name Required').exists()
]], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(401).json(errors.array())
    }
    const { name, phone, email } = req.body
    try {
        await Contact.findOneAndUpdate({ "_id": req.params.id}, { name: name, phone: phone, email: email,id:req.params.id}, 
        (err, result) => {
            if(err) console.log(err);
            res.json(result)
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Server Error" })
    }
    res.send('Update COntact ' + req.params.id)
})





//route for delete
router.delete('/:id', [auth], async (req, res) => {

    try {
        const contact = await Contact.findOneAndDelete({"_id": req.params.id})

        if(!contact) {
            res.status(401).json({ msg: "No Contact to Delete"})
        }
        res.json({ msg: "Deleted Successfully" })
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Server Error') 
    }
    // res.send('DELETE Contact')
})

module.exports = router;