const mongoose = require('mongoose');

// Define the Lessee schema
const LesseeSchema = new mongoose.Schema({
  LesseeID: {
    type: String,
    required: true,
    unique: true // Ensures uniqueness of the Lessee ID
  },
  nameandaddress: {
    type: String,
    required: true
  },
  GST: {
    type: String,
    required: true
  }
});

const Lessee = mongoose.model('Lessee', LesseeSchema);

module.exports = Lessee;