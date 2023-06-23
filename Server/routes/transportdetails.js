const express=require('express');
const router=express.Router();
const TransportDetails = require('../models/TransportDetails');
const { route } = require('./auth');

router.post('/',async(req,res) =>{
    const { vehicleNo, driverName, driverLicenseNo } = req.body;
    try {
        const existingTPDetails = await TransportDetails.findOne({ driverLicenseNo });
        if (existingTPDetails) {
            return res.status(400).json({ error: 'An entry with the same Driver License Number already exists.' });
          }
        const newTPDetails = new TransportDetails({
        vehicleNo,
        driverName,
        driverLicenseNo
        });
        const savedTPD=await newTPDetails.save();
        res.json(savedTPD);
    } catch (error) {
        res.status(500).json({ error: 'Failed to store Transport Details in MongoDB' });
    }
});
module.exports=router;
