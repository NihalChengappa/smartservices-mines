const express=require('express');
const router=express.Router();
const Alert = require('../models/Alert');

router.post('/',async(req,res) =>{
    const { route, team, startdatetime,enddatetime } = req.body;
    console.log(req.body)
    try {
        const newAlert= new Alert({
        route,
        team,
        startdatetime,
        enddatetime
        });
        const savedalert=await newAlert.save();
        res.json(savedalert);
    } catch (error) {
        res.status(500).json({ error: 'Failed to store Alert in MongoDB' });
    }
});
module.exports=router;
