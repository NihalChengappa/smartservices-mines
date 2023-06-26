const express = require('express');
const router = express.Router();

// Import the Checkpost model or any other necessary dependencies
const SCCC = require('../models/SCCC');

// Route to fetch all routes
router.get('/', async (req, res) => {
    try {
      const sccc = await SCCC.find();
      res.json(sccc);
    //   console.log(res)
    } catch (error) {
      console.error('Error fetching SCCC details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;