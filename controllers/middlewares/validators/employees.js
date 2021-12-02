const Joi = require('joi');
const { celebrate } = require('celebrate');

const titleList = ['President', 'Manager', 'Leader', 'Sales Rep'];

const employeeSchema = {
  _id: Joi.number().integer().positive().required(),
  lastName: Joi.string().min(3).max(50).trim().invalid('9999').required(),
  firstName: Joi.string().min(3).max(50).trim().required(),
  extension: Joi.string().max(50).trim().required(),
  email: Joi.string().min(10).max(100).email().trim().required(),
  officeCode: Joi.string().min(3).max(20).required(),
  reportsTo: Joi.number().integer().positive().allow(null),
  jobTitle: Joi.string()
    .valid(...titleList)
    .required(),
};

const updateEmployeeSchema = {
  lastName: Joi.string().min(3).max(50).trim().invalid('9999').required(),
  firstName: Joi.string().min(3).max(50).trim().required(),
  extension: Joi.string().max(50).trim().required(),
  email: Joi.string().min(10).max(100).email().trim().required(),
  officeCode: Joi.string().min(3).max(20).required(),
  reportsTo: Joi.number().integer().positive().allow(null),
  jobTitle: Joi.string()
    .valid(...titleList)
    .required(),
};

const validateCreateEmployee = celebrate(
  {
    params: Joi.object().keys({}),
    query: Joi.object().keys({}),
    body: Joi.object().keys(employeeSchema),
  },
  {
    abortEarly: false,
    convert: false,
    escapeHTML: true,
  }
);

const validatePutEmployee = celebrate(
  {
    query: Joi.object().keys({}),
    body: Joi.object().keys(updateEmployeeSchema),
  },
  {
    abortEarly: false,
    convert: false,
    escapeHTML: true,
  }
);

module.exports = { validateCreateEmployee, validatePutEmployee };
