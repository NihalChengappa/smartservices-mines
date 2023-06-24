const express = require('express');
const router = express.Router();

// Import the Checkpost model or any other necessary dependencies
const Route = require('../models/Routes');

// Route to fetch all routes
router.get('/', async (req, res) => {
    try {
      const routes = await Route.find({}, 'routeName');
      console.log(routes)
      const routeNames = routes.map((route) => route.routeName);
      res.json(routeNames);
    //   console.log(res)
    } catch (error) {
      console.error('Error fetching Route names:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;