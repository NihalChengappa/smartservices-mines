const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

router.get('/', async (req, res) => {
    try {
      const alerts = await Alert.find();
      res.json(alerts);
    } catch (error) {
      console.error('Error fetching alerts :', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;