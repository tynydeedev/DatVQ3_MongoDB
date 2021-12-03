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
const logger = require('../controllers/middlewares/logger/logger');

router
  .route('/')
  .get(
    autho(['President', 'Manager', 'Leader']),
    errorWrapper(async (req, res, next) => {
      const result = await getAllEmployees();

      const requestId = res.locals.requestId;
      const { username } = res.locals.tokenData;
      logger.info(requestId, `${req.method} - ${req.originalUrl} - success`, username);

      return res.send(result);
    })
  )
  .post(
    autho(['President', 'Manager']),
    validateCreateEmployee,
    errorWrapper(async (req, res, next) => {
      const result = await createEmployee(req.body);

      const requestId = res.locals.requestId;
      const { username } = res.locals.tokenData;
      logger.info(requestId, `${req.method} - ${req.originalUrl} - success`, username);

      res.send(result);
    })
  );

// Validation the parameter
router.use('/:employeeNumber', (req, res, next) => {
  if (/[^0-9]/.test(req.params.employeeNumber)) {
    const requestId = res.locals.requestId;
    logger.warn(requestId, 'Invalid employeeNumber @/employees/:employeeNumber');
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

      const requestId = res.locals.requestId;
      const { username } = res.locals.tokenData;
      logger.info(requestId, `${req.method} - ${req.originalUrl} - success`, username);

      return res.send(result);
    })
  )
  .put(
    autho(['President', 'Manager']),
    validatePutEmployee,
    errorWrapper(async (req, res, next) => {
      const employeeNumber = +req.params.employeeNumber;
      const result = await updateEmployee(employeeNumber, req.body);

      const requestId = res.locals.requestId;
      const { username } = res.locals.tokenData;
      logger.info(requestId, `${req.method} - ${req.originalUrl} - success`, username);

      return res.send(result);
    })
  )
  .delete(
    autho(['President']),
    errorWrapper(async (req, res, next) => {
      const employeeNumber = +req.params.employeeNumber;
      const result = await deleteEmployee(employeeNumber);

      const requestId = res.locals.requestId;
      const { username } = res.locals.tokenData;
      logger.info(requestId, `${req.method} - ${req.originalUrl} - success`, username);

      return res.send(result);
    })
  );

module.exports = router;
