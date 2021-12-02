const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  _id: { type: Number },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  firstName: {
    type: String,
    minLength: 3,
    maxlength: 50,
    required: true,
  },
  extension: {
    type: String,
    maxlength: 50,
    required: true,
  },
  email: {
    type: String,
    minlength: 10,
    maxlength: 100,
    match: /^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    required: true,
  },
  officeCode: {
    type: String,
    maxlength: 10,
    required: true,
  },
  reportsTo: { type: Number, default: null },
  jobTitle: {
    type: String,
    enum: ['President', 'Manager', 'Leader', 'Staff'],
    required: true,
  },
});

const Employees = mongoose.model('Employees', EmployeeSchema);

module.exports = Employees;
