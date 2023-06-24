const express = require('express');
const router = express.Router();

// Import the Checkpost model or any other necessary dependencies
const Checkpost = require('../models/Checkpost');

// Route to fetch all checkposts
router.get('/', async (req, res) => {
    try {
      const checkposts = await Checkpost.find({}, 'name');
      const checkpostNames = checkposts.map((checkpost) => checkpost.name);
      console.log(checkpostNames);
      res.json(checkpostNames);
      // console.log(res)
    } catch (error) {
      console.error('Error fetching checkpost names:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
