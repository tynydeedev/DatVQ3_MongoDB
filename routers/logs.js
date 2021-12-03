const router = require('express').Router();

// Database
const { getLog } = require('../controllers/database/logs');

// Authorization middleware
const autho = require('../controllers/middlewares/authorization');

// Validation middleware
const { validateGetLog, validateChangeLogLevel } = require('../controllers/middlewares/validators/logs');

// Other utils
const { errorWrapper } = require('../controllers/middlewares/errorHandler/errorHandler');
const logger = require('../controllers/middlewares/logger/logger');

// Change log level
const { changeLogLevel } = require('../controllers/utils/logConfig');

router.get(
  '/',
  autho(['President', 'Manager']),
  validateGetLog,
  errorWrapper(async (req, res, next) => {
    const query = req.query;
    const result = await getLog(query);

    const requestId = res.locals.requestId;
    const { username } = res.locals.tokenData;
    logger.info(requestId, `${req.method} - ${req.originalUrl} - success`, username);

    return res.send(result);
  })
);

router.post('/change', autho(['President']), validateChangeLogLevel, (req, res, next) => {
  const level = req.body.logLevel;
  const result = changeLogLevel(level);

  const requestId = res.locals.requestId;
  const { username } = res.locals.tokenData;
  logger.system(requestId, `Log level changed to ${level}`, username);

  return res.send({ status: result, message: `Log level changed to ${level}` });
});

module.exports = router;
