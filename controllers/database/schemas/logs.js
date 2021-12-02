const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
  timestamp: { type: Date, required: true, default: new Date() },
  level: {
    type: String,
    enum: ['info', 'warn', 'error'],
    required: true,
  },
  user: { type: String, required: true },
  message: { type: String, required: true },
  stack: { type: String },
  query: { type: Object },
  params: { type: Object },
  body: { type: Object },
});

const Logs = mongoose.model('Logs', logSchema);

module.exports = Logs;
