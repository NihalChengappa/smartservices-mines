const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeName: {
    type: String,
    unique: true, // Ensure uniqueness
    required: true,
  },
  checkposts: {
    type: [String],
    required: true,
  },
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
