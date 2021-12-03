const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
  requestId: { type: String, required: true, unique: true },
  timestamp: { type: Date, required: true, default: Date.now },
  level: {
    type: String,
    enum: ['info', 'warn', 'error', 'system'],
    required: true,
  },
  username: { type: String, required: true },
  message: { type: String, required: true },
  stack: { type: String },
  query: { type: Object },
  params: { type: Object },
  body: { type: Object },
});

const Logs = mongoose.model('Logs', logSchema);

module.exports = Logs;
