const express = require('express');
const router = express.Router();

// Import the Checkpost model or any other necessary dependencies
const Teams = require('../models/Teams');

// Route to fetch all routes
router.get('/', async (req, res) => {
    try {
      const teamid = await Teams.find({}, 'teamId');
    //   console.log(teamid)
      const teamids = teamid.map((teamid) => teamid.teamId);
      res.json(teamids);
    //   console.log(res)
    } catch (error) {
      console.error('Error fetching Team Ids:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;