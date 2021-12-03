// Joi
const Joi = require('joi');
const { celebrate } = require('celebrate');

function validateLogInput(data) {
  const logSchema = {
    requestId: Joi.string().required(),
    timestamp: Joi.date().required(),
    level: Joi.string().valid('info', 'warn', 'error', 'system').required(),
    username: Joi.string().min(0).allow(null).required(),
    message: Joi.string().required(),
    stack: Joi.string(),
    query: Joi.object(),
    params: Joi.object(),
    body: Joi.object(),
  };
  return Joi.attempt(data, Joi.object().keys(logSchema), 'Invalid log input');
}

const logRequireSchema = {
  username: Joi.string(),
  level: Joi.string().valid('info', 'warn', 'error'),
  fromTime: Joi.date(),
  toTime: Joi.date(),
  requestId: Joi.string(),
};

const validateGetLog = celebrate(
  {
    params: Joi.object().keys({}),
    query: Joi.object().keys(logRequireSchema),
    body: Joi.object().keys({}),
  },
  {
    abortEarly: false,
    convert: true,
    escapeHTML: true,
  }
);

const changeLogLevelSchema = {
  logLevel: Joi.string().valid('info', 'warn', 'error'),
};

const validateChangeLogLevel = celebrate(
  {
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
    body: Joi.object().keys(changeLogLevelSchema),
  },
  { abortEarly: false, convert: false, escapeHTML: true }
);

module.exports = { validateLogInput, validateGetLog, validateChangeLogLevel };
