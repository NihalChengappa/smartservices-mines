const express=require('express');
const router=express.Router();
const Eligibility = require('../models/Eligibility');
const { route } = require('./auth');

router.post('/',async(req,res) =>{
    const { lesseeID, details } = req.body;
    try {
        const existingEligibility = await Eligibility.findOne({ lesseeID });
        if (existingEligibility) {
            return res.status(400).json({ error: 'An entry with the same LesseeID already exists.' });
          }
        const newEligibility = new Eligibility({
        lesseeID,
        details
        });
        const savedEligibility=await newEligibility.save();
        res.json(savedEligibility);
    } catch (error) {
        res.status(500).json({ error: 'Failed to store Eligibility Details in MongoDB' });
    }
});
module.exports=router;
