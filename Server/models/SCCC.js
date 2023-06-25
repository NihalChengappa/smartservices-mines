const mongoose = require('mongoose');

const ScccSchema = new mongoose.Schema({
  contractorName: {
    type: String,
    required: true
  },
  agreementNo: {
    type: String,
    required: true
  },
  gstRegistrationNo: {
    type: String,
    required: true
  },
  districtAllotted: {
    type: String,
    required: true
  },
  districtCode: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('SCCC', ScccSchema);