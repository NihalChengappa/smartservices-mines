const mongoose = require('mongoose');

// Define the Transport Details schema
const tpdetailsSchema = new mongoose.Schema({
  vehicleNo: {
    type: String,
    required: true,
    unique: true // Ensures uniqueness of the Vehicle Number
  },
  driverName: {
    type: String,
    required: true
  },
  driverLicenseNo: {
    type: String,
    required: true
  }
});

const TransportDetails = mongoose.model('TransportDetails', tpdetailsSchema);

module.exports = TransportDetails;