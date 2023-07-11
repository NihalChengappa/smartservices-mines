const { string } = require('joi');
const mongoose = require('mongoose');

const routeTrackerSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  teamID: {
    type: String,
    required: true
  },
  checkpostID: {
    type: String,
    required: true
  },
  imageData: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('RouteTracker', routeTrackerSchema);
