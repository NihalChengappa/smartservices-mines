const express = require('express');
const router = express.Router();

// Import the Checkpost model or any other necessary dependencies
const Teams = require('../models/Teams');

// Route to fetch all routes
router.get('/', async (req, res) => {
    try {
      const teamid = await Teams.find();
    //   console.log(teamid)
      res.json(teamid);
    //   console.log(res)
    } catch (error) {
      console.error('Error fetching Team Ids:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;