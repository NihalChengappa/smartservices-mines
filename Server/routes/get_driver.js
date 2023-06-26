const express = require('express');
const router = express.Router();

// Import the Checkpost model or any other necessary dependencies
const Driver = require('../models/TransportDetails');

// Route to fetch all routes
router.get('/', async (req, res) => {
    try {
      const Drivers = await Driver.find();
      console.log(Drivers)
      // const employeeNames = employees.map((employee) => employee.name);
      res.json(Drivers);
    //   console.log(res)
    } catch (error) {
      console.error('Error fetching Drivers :', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;