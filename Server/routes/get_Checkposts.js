const express = require('express');
const router = express.Router();
const Checkpost = require('../models/Checkpost');

router.get('/', async (req, res) => {
    try {
      const checkposts = await Checkpost.find();
      console.log(checkposts)
      res.json(checkposts);
    } catch (error) {
      console.error('Error fetching Checkposts :', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;