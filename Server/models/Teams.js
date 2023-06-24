const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamId: {
    type: String,
    unique: true, // Ensure uniqueness
    required: true,
  },
  member1: {
    type: String,
  },
  member2: {
    type: String,
  },
});


module.exports = mongoose.model('Teams', teamSchema);
