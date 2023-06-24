const express = require('express');
const router = express.Router();

// Import the Checkpost model or any other necessary dependencies
const Employee = require('../models/Employee');

// Route to fetch all routes
router.get('/', async (req, res) => {
    try {
      const employees = await Employee.find({role:'Mobile Squad'}, 'name');
      console.log(employees)
      const employeeNames = employees.map((employee) => employee.name);
      res.json(employeeNames);
    //   console.log(res)
    } catch (error) {
      console.error('Error fetching Employee names:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;