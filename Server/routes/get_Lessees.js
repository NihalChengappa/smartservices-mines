const express = require('express');
const router = express.Router();

// Import the Checkpost model or any other necessary dependencies
const Lessee = require('../models/Lessee');

// Route to fetch all routes
router.get('/', async (req, res) => {
    try {
      const Lessees = await Lessee.find();
      // const employeeNames = employees.map((employee) => employee.name);
      res.json(Lessees);
    //   console.log(res)
    } catch (error) {
      console.error('Error fetching Lessees :', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;