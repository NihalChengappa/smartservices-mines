const mongoose = require('mongoose');

// Define the Eligibility schema
const detailsSchema = new mongoose.Schema({
    mineralName: String,
    weight: Number,
  });
  
  const eligibilitySchema = new mongoose.Schema({
    lesseeID: String,
    details: [detailsSchema],
  });

const Eligibility = mongoose.model('Eligibility', eligibilitySchema);

module.exports = Eligibility;
