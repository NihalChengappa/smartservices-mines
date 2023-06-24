// employeeSchema.js

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Operator', 'Checkpost op', 'Mobile Squad'],
  },
  checkpostName: {
    type: String,
    required: function () {
      return this.role === 'Checkpost op';
    },
  },
  routeName: {
    type: String,
    required: function () {
      return this.role === 'Mobile Squad';
    },
  },
  companyName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Employee', employeeSchema);
