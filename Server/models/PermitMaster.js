const mongoose = require('mongoose');

const permitMasterSchema = new mongoose.Schema({
  bookNumber: { type: String, required: true },
  formNumber: { type: String, required: true },
  currentDate: { type: String, required: true },
  validUpto: { type: String, required: true },
  contractorName: { type: String, required: true },
  agreementNo: { type: String, required: true },
  gstRegistrationNo: { type: String, required: true },
  districtAllotted: { type: String, required: true },
  districtCode: { type: String, required: true },
  lesseeId: { type: String, required: true },
  lesseeNameandAddress: { type: String, required: true },
  lesseeGstNo: { type: String, required: true },
  syNo: { type: String, required: true },
  village: { type: String, required: true },
  mandal: { type: String, required: true },
  district: { type: String, required: true },
  leaseExtent: { type: String, required: true },
  saleValue: { type: String, required: true },
  mineralName: { type: String, required: true },
  quantity: { type: Number, required: true },
  consigneeNameandAddress: { type: String, required: true },
  driverLicenceNo: { type: String, required: true },
  driverName: { type: String, required: true },
  vehicleNo: { type: String, required: true },
  destination: { type: String, required: true },
  destinationDistance: { type: String, required: true },
  arrivalDateTime: { type: Date, required: true },
  dispatchDateTime: { type: Date, required: true },
});

const PermitMaster = mongoose.model('PermitMaster', permitMasterSchema);

module.exports = PermitMaster;
