const express=require('express');
const router=express.Router();
const Checkpost = require('../models/Checkpost');
const { route } = require('./auth');

router.post('/',async(req,res) =>{
    const { checkpostID, name, town, division } = req.body;
    try {
        const existingCheckpoint = await Checkpost.findOne({ checkpostID });
        if (existingCheckpoint) {
            return res.status(400).json({ error: 'A checkpoint with the same Checkpost ID already exists.' });
          }
        const newCheckpost = new Checkpost({
        checkpostID,
        name,
        town,
        division
        });
        const savedChk=await newCheckpost.save();
        res.json(savedChk);
    } catch (error) {
        res.status(500).json({ error: 'Failed to store Checkpost in MongoDB' });
    }
});
module.exports=router;
