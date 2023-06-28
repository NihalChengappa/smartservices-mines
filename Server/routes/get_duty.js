const express = require('express');
const router = express.Router();
const Duty = require('../models/DutyTracker');

router.get('/', async (req, res) => {
    try {
      const duties = await Duty.find();
      console.log(duties)
      res.json(duties);
    } catch (error) {
      console.error('Error fetching Duties :', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;