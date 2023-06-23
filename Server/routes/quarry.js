const express=require('express');
const router=express.Router();
const Quarry = require('../models/Quarry');
const { route } = require('./auth');

router.post('/',async(req,res) =>{
    const { syNo, village, mandal, district } = req.body;
    try {
        const existingQuarryDetails = await Quarry.findOne({ syNo });
        if (existingQuarryDetails) {
            return res.status(400).json({ error: 'An entry with the same Sy Number already exists.' });
          }
        const newQuarryDetails = new Quarry({
        syNo,
        village,
        mandal,
        district
        });
        const savedQuarryD=await newQuarryDetails.save();
        res.json(savedQuarryD);
    } catch (error) {
        res.status(500).json({ error: 'Failed to store Quarry Details in MongoDB' });
    }
});
module.exports=router;