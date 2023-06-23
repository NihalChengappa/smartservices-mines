const mongoose = require('mongoose');

// Define the Transport Details schema
const quarrySchema = new mongoose.Schema({
  syNo: {
    type: String,
    required: true,
    unique: true // Ensures uniqueness of the Sy Number
  },
  village: {
    type: String,
    required: true
  },
  mandal: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  }
});

const Quarry = mongoose.model('Quarry', quarrySchema);

module.exports = Quarry;