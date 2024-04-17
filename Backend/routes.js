const express = require('express');
const userDetails = require('./models/models'); 
const {get} = require('mongoose');

const getRouter = express.Router();

getRouter.get('/GET', async (req, res) => {
    try {
        const details = await userDetails.find();

        console.log('Retrieved details:', details);

        if (details.length === 0) {
            return res.status(404).json({ message: 'No details found' });
        }

        res.status(200).json(details);
    } catch (err) {
        console.error(err, 'GET error');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

getRouter.post('/POST', async (req, res)=>{
    try{
        const {userid, fname, lname, country, age, typeofcontent} = req.body;
        console.log(req.body);
        const newUser = new userDetails({
            userid,
            fname, 
            lname, 
            country, 
            age, 
            typeofcontent
        });
        await newUser.save();
        res.status(200).json({"Successfully added new user": newUser});

    }catch(err){
        console.error(err, "Post error")
    }
})

getRouter.patch('/PATCH/:userid', async (req,res)=>{
    const {userid} =  req.params;
    const updates = req.body;

    try{
        const updateuser = await userDetails.findOneAndUpdate(
            {userid: userid},
            {$set: updates},
            {new: true}
        );
        res.status(200).json({message:"successfully updated user", updateuser });

    }catch(err){
        console.error(err, "patch error")
    }
});

getRouter.delete('/DELETE/:userid', async (req,res)=>{
    const {userid} =  req.params;

    try{
        const deleteuser = await userDetails.findOneAndDelete(
            {userid: userid},
        );
        res.status(200).json({message:"successfully Deleted user", deleteuser });

    }catch(err){
        console.error(err, "delete error")
    }
});

module.exports = { getRouter };

