const mongoose = require('mongoose');

// Define the Checkpost schema
const checkpostSchema = new mongoose.Schema({
  checkpostID: {
    type: String,
    required: true,
    unique: true // Ensures uniqueness of the Checkpost ID
  },
  name: {
    type: String,
    required: true
  },
  town: {
    type: String
  },
  division: {
    type: String
  }
});

const Checkpost = mongoose.model('Checkpost', checkpostSchema);

module.exports = Checkpost;
