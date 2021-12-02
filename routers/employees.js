const express = require('express');
const router = express.Router();

// Authorization middleware
const autho = require('../controllers/middlewares/authorization');

// Validation middleware
const { validateCreateEmployee, validatePutEmployee } = require('../controllers/middlewares/validators/employees');

// Database functions
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/database/employees');

// Other utils
const ErrorCreator = require('../controllers/middlewares/errorHandler/errorCreator');
const { errorWrapper } = require('../controllers/middlewares/errorHandler/errorHandler');
const logger = require('../controllers/utils/logger');

router
  .route('/')
  .get(
    autho(['President', 'Manager', 'Leader']),
    errorWrapper(async (req, res, next) => {
      const result = await getAllEmployees();
      return res.send(result);
    })
  )
  .post(
    autho(['President', 'Manager']),
    validateCreateEmployee,
    errorWrapper(async (req, res, next) => {
      const result = await createEmployee(req.body);
      res.send(result);
    })
  );

// Validation the parameter
router.use('/:employeeNumber', (req, res, next) => {
  if (/[^0-9]/.test(req.params.employeeNumber)) {
    logger.error('Invalid employeeNumber @/employees/:employeeNumber');
    throw new ErrorCreator('Invalid employeeNumber', 400);
  }
  next();
});

router
  .route('/:employeeNumber')
  .get(
    autho(['President', 'Manager', 'Leader']),
    errorWrapper(async (req, res, next) => {
      const employeeNumber = +req.params.employeeNumber;
      const result = await getEmployeeById(employeeNumber);
      return res.send(result);
    })
  )
  .put(
    autho(['President', 'Manager']),
    validatePutEmployee,
    errorWrapper(async (req, res, next) => {
      const employeeNumber = +req.params.employeeNumber;
      const result = await updateEmployee(employeeNumber, req.body);
      return res.send(result);
    })
  )
  .delete(
    autho(['President']),
    errorWrapper(async (req, res, next) => {
      const employeeNumber = +req.params.employeeNumber;
      const result = await deleteEmployee(employeeNumber);
      return res.send(result);
    })
  );

module.exports = router;
