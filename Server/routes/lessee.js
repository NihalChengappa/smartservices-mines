const express=require('express');
const router=express.Router();
const Lessee = require('../models/Lessee');
const { route } = require('./auth');

router.post('/',async(req,res) =>{
    const { LesseeID, nameandaddress, GST } = req.body;
    try {
        const existingLessee = await Lessee.findOne({ LesseeID });
        if (existingLessee) {
            return res.status(400).json({ error: 'An entry with the same Lessee ID already exists.' });
          }
        const newLessee = new Lessee({
        LesseeID,
        nameandaddress,
        GST
        });
        const savedLessee=await newLessee.save();
        res.json(savedLessee);
    } catch (error) {
        res.status(500).json({ error: 'Failed to store Lessee Details in MongoDB' });
    }
});
module.exports=router;
