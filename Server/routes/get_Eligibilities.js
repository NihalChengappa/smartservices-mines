const express = require('express');
const router = express.Router();

// Import the Checkpost model or any other necessary dependencies
const Eligibility = require('../models/Eligibility');

// Route to fetch all routes
router.get('/', async (req, res) => {
    try {
      const eligibility = await Eligibility.find();
      console.log(eligibility)
      // const employeeNames = employees.map((employee) => employee.name);
      res.json(eligibility);
    //   console.log(res)
    } catch (error) {
      console.error('Error fetching Eligibilities :', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;