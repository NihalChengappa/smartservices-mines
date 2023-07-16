const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  startdatetime: {
    type: Date,
    required: true,
  },
  enddatetime: {
    type: Date,
    required: true,
  },
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
