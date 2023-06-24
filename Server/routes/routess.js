// Import the necessary dependencies
const express = require('express');
const router = express.Router();

// Import the Route model or any other necessary dependencies
const Route = require('../models/Routes');

// Route to create a new route
router.post('/', async (req, res) => {
  try {
    // Extract the data from the request body
    const { routeName, checkposts } = req.body;

    // Check if the route name already exists
    const existingRoute = await Route.findOne({ routeName });
    if (existingRoute) {
      return res.status(400).json({ error: 'Route name must be unique' });
    }

    // Create a new instance of the Route model
    const newRoute = new Route({
      routeName,
      checkposts,
    });

    // Save the new route to the database
    await newRoute.save();

    // Send a success response
    res.status(201).json({ message: 'Route created successfully' });
  } catch (error) {
    console.error('Error creating route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
