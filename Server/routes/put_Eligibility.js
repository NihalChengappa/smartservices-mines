const express = require('express');
const router = express.Router();

// Import the Checkpost model or any other necessary dependencies
const Eligibility = require('../models/Eligibility');

// Route to fetch all routes
router.put('/:lese/:mineralused', async (req, res) => {
    try {
      const {quantity} = req.body
      const{lese}=req.params;
      const {mineralused}=req.params;
      const eligibility=await Eligibility.findOne({lesseeID:lese});
      const updatedDetails = eligibility.details.map((item) => {
        if (item.mineralName === mineralused) {
          const newWeight = item.weight - quantity;
          return { ...item, weight: newWeight };
        }
        return item;
      });
      
      eligibility.details = updatedDetails;
      await eligibility.save();
      // const employeeNames = employees.map((employee) => employee.name);
      res.json(updatedDetails);
    //   console.log(res)
    } catch (error) {
      console.error('Error fetching Eligibilities :', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;