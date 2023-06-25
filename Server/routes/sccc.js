const express = require("express");
const router = express.Router();
const SCCC = require('../models/SCCC');

router.post('/', async (req, res) => {
  try {
    const { contractorName, agreementNo, gstRegistrationNo, districtAllotted, districtCode } = req.body;
    console.log(req.body)
    const newSccc = new SCCC({ contractorName, agreementNo, gstRegistrationNo, districtAllotted, districtCode });
    await newSccc.save();
    res.status(201).json({ message: 'SCCC awardee created successfully' });
  } 
  catch (error) {
    console.error('Error creating SCCC awardee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
