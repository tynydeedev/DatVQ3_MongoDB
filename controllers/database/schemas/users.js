const mongoose = require('mongoose');
const { Schema } = mongoose;
const Employees = require('./employees');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
  },
  employeeNumber: {
    type: Number,
    unique: true,
    required: true,
    ref: Employees,
  },
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
