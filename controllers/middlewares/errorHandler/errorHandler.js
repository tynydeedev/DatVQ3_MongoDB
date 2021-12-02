// Logger
const logger = require('../../utils/logger');

function ErrorHandler(error, req, res, next) {
  const { username } = res.locals.tokenData;

  if ([400, 401, 403].includes(error.statusCode)) {
    logger.warn(error, username);
  } else {
    logger.error(error, username);
  }

  let { message, statusCode = 500, status = 'error' } = error;

  if (statusCode === 500) {
    message = 'Internal Server Error';
  }

  return res.status(statusCode).send({ status, message });
}

function errorWrapper(func) {
  return function (req, res, next) {
    func(req, res, next).catch(next);
  };
}

module.exports = { ErrorHandler, errorWrapper };
