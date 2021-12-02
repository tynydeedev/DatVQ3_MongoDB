const Employees = require('./schemas/employees');

// Error creator
const ErrorCreator = require('../middlewares/errorHandler/errorCreator');

async function getAllEmployees() {
  const employees = await Employees.find();
  return employees;
}

async function getEmployeeById(id) {
  const employee = await Employees.findById(id);
  if (!employee) throw new ErrorCreator('Invalid employeeNumber', 400);
  return employee;
}

async function createEmployee(data) {
  const newEmployee = await Employees.create(data);
  return newEmployee;
}

async function updateEmployee(id, data) {
  const result = await Employees.findByIdAndUpdate(id, data, { returnDocument: 'after' });
  if (!result) throw new ErrorCreator('Invalid employeeNumber', 400);
  return result;
}

async function deleteEmployee(id) {
  const result = await Employees.findByIdAndDelete(id);
  if (!result) throw new ErrorCreator('Invalid employeeNumber', 400);
  return { status: 'success', message: `Successfully delete employee #${id}` };
}

module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee };
