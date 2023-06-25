const express = require('express');
const router = express.Router();
const RouteTracker = require('../models/RouteTracker');

router.post('/', async (req, res) => {
  try {
    const {date,time,teamID,checkpostID,imageData} = req.body;
    const newRouteTracker = new RouteTracker({
        date,
        time,
        teamID,
        checkpostID,
        imageData,
    });
    await newRouteTracker.save();
    res.status(201).json({ message: 'RouteTracker created successfully' });
  } catch (error) {
    console.error('Error creating route tracker:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
