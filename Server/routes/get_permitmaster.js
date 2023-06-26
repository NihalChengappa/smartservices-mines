const express = require('express');
const router = express.Router();
const PermitMaster= require('../models/PermitMaster');
router.get('/', async (req, res) => {
    try {
      const permit = await PermitMaster.find();
      res.json(permit);
    //   console.log(res)
    } catch (error) {
      console.error('Error fetching Permits:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;