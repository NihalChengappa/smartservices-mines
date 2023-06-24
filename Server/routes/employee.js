const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

router.post('/', async (req, res) => {
  try {
    const { employeeId, name, phoneNumber, role,checkpostName,routeName, companyName } = req.body;
    const existingCheckpoint = await Employee.findOne({ employeeId });
        if (existingCheckpoint) {
            return res.status(400).json({ error: 'A checkpoint with the same Employee ID already exists.' });
          }

    const newEmployee = new Employee({
      employeeId,
      name,
      phoneNumber,
      role,
      checkpostName,
      routeName,
      companyName
    });
    console.log(newEmployee)
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
