const Employees = require('./schemas/employees');

// Error creator
const ErrorCreator = require('../middlewares/errorHandler/errorCreator');

// Logger
const logger = require('../utils/logger');

async function getAllEmployees() {
  try {
    const employees = await Employees.find();
    return employees;
  } catch (error) {
    logger.error(error);
    throw new ErrorCreator('Internal Server Error', 500);
  }
}

async function getEmployeeById(id) {
  try {
    const employee = await Employees.findById(id);
    if (!employee) throw new ErrorCreator('Invalid employeeNumber', 400);
    return employee;
  } catch (error) {
    if (error.statusCode === 400) {
      logger.warn(error);
      throw error;
    }

    logger.error(error);
    throw new ErrorCreator('Internal Server Error', 500);
  }
}

async function createEmployee(data) {
  try {
    const newEmployee = await Employees.create(data);
    return newEmployee;
  } catch (error) {
    console.log(error);
    throw new ErrorCreator('Internal Server Error', 500);
  }
}

async function updateEmployee(id, data) {
  try {
    const result = await Employees.findByIdAndUpdate(id, data, { returnDocument: 'after' });
    if (!result) throw new ErrorCreator('Invalid employeeNumber', 400);
    return result;
  } catch (error) {
    if (error.statusCode === 400) {
      logger.warn(error);
      throw error;
    }

    logger.error(error);
    throw new ErrorCreator('Internal Server Error', 500);
  }
}

async function deleteEmployee(id) {
  try {
    await Employees.findByIdAndDelete(id);
    logger.info(`Deleted employee #${id}`);
    return { status: 'success', message: `Successfully delete employee #${id}` };
  } catch (error) {
    if (error.statusCode === 400) {
      logger.warn(error);
      throw error;
    }

    logger.error(error);
    throw new ErrorCreator('Internal Server Error', 500);
  }
}

module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee };
