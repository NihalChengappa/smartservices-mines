const express=require('express');
const router=express.Router();
const Team = require('../models/Teams');

router.post('/',async(req,res) =>{
    const { teamId,member1,member2 } = req.body;
    try {
        const existingteam = await Team.findOne({ teamId });
        if (existingteam) {
            return res.status(400).json({ error: 'An entry with the same team ID already exists.' });
          }
        const newTeam = new Team({
        teamId,
        member1,
        member2,
        });
        const savedTeam=await newTeam.save();
        res.json(savedTeam);
    } catch (error) {
        res.status(500).json({ error: 'Failed to store Team Details in MongoDB' });
    }
});
module.exports=router;