const express=require('express');
const router=express.Router();
const DutyTracker = require('../models/DutyTracker');

router.post('/',async(req,res) =>{
    const { date,teamId,route } = req.body;
    try {
        const newDuty = new DutyTracker({
        date,teamId,route
        });
        console.log(newDuty)
        const savedduty=await newDuty.save();
        res.json(savedduty);
    } catch (error) {
        res.status(500).json({ error: 'Failed to store Duty in MongoDB' });
    }
});
module.exports=router;
