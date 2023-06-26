const express = require('express');
const router = express.Router();

// Import the Checkpost model or any other necessary dependencies
const Quarry = require('../models/Quarry');

// Route to fetch all routes
router.get('/', async (req, res) => {
    try {
      const quarry = await Quarry.find();
      // const employeeNames = employees.map((employee) => employee.name);
      res.json(quarry);
    //   console.log(res)
    } catch (error) {
      console.error('Error fetching quarry :', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;