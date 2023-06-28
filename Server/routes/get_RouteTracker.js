const express = require('express');
const router = express.Router();

// Import the Checkpost model or any other necessary dependencies
const RouteTracker = require('../models/RouteTracker');

// Route to fetch all routes
router.get('/', async (req, res) => {
    try {
      const routes = await RouteTracker.find();
    //   console.log(routes)
      res.json(routes);
    } catch (error) {
      console.error('Error fetching RouteTracker :', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;