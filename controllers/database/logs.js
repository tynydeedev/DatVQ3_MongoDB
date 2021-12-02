const Logs = require('./schemas/logs');

// Joi
const Joi = require('joi');

function validateLogInput(data) {
  const logSchema = {
    timestamp: Joi.date().required(),
    level: Joi.string().valid('info', 'warn', 'error').required(),
    user: Joi.string().min(0).allow(null).required(),
    message: Joi.string().required(),
    stack: Joi.string(),
    query: Joi.object(),
    params: Joi.object(),
    body: Joi.object(),
  };
  return Joi.attempt(data, Joi.object().keys(logSchema), 'Invalid log input');
}

module.exports = async function (logData) {
  try {
    const validLogData = await validateLogInput(logData);
    await Logs.create(validLogData);
  } catch (error) {
    console.log('Error @createLog', error);
    throw error;
  }
};
