const mongoose = require('mongoose');

// Define the Eligibility schema
const DutySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
      },
      teamId: {
        type: String,
        required: true
      },
      route: {
        type: String,
        required: true
      },
  });

module.exports = mongoose.model('DutyTracker', DutySchema);
