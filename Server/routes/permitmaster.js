const express=require('express');
const router=express.Router();
const PermitMaster = require('../models/PermitMaster');

router.post('/',async(req,res) =>{
    const { bookNumber,formNumber,currentDate,validUpto,contractorName,agreementNo,gstRegistrationNo,districtAllotted,districtCode,lesseeId,lesseeNameandAddress,lesseeGstNo,
        syNo,village,mandal,district,leaseExtent,saleValue,mineralName,quantity,consigneeNameandAddress,driverLicenceNo,driverName,vehicleNo,
        destination,destinationDistance,arrivalDateTime,dispatchDateTime } = req.body;
    try {
        const newPermit = new PermitMaster({
            bookNumber,
            formNumber,
            currentDate,
            validUpto,
            contractorName,
            agreementNo,
            gstRegistrationNo,
            districtAllotted,
            districtCode,
            lesseeId,
            lesseeNameandAddress,
            lesseeGstNo,
            syNo,
            village,
            mandal,
            district,
            leaseExtent,
            saleValue,
            mineralName,
            quantity,
            consigneeNameandAddress,
            driverLicenceNo,
            driverName,
            vehicleNo,
            destination,
            destinationDistance,
            arrivalDateTime,
            dispatchDateTime,
        });
        const savedPermit=await newPermit.save();
        res.json(savedPermit);
    } catch (error) {
        res.status(500).json({ error: 'Failed to store Permit in MongoDB' });
    }
});
module.exports=router;
