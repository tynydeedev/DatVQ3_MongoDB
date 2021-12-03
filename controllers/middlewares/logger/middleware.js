const { isCelebrateError } = require('celebrate');
const logger = require('./logger');
const ErrorCreator = require('../errorHandler/errorCreator');

module.exports = function (error, req, res, next) {
  const requestId = res.locals.requestId;
  const tokenData = res.locals.tokenData;
  const username = tokenData?.username;

  if (isCelebrateError(error)) {
    const query = error.details.get('query');
    const params = error.details.get('params');
    const body = error.details.get('body');
    const err = new ErrorCreator(
      `${error.message}: query - ${query?.message || 'No error'}, param - ${params?.message || 'No error'}, body - ${
        body?.message || 'No error'
      }`,
      400
    );
    logger.warn(requestId, err, username);
  } else {
    if (!error.statusCode) {
      logger.error(requestId, error, username);
    } else {
      if (error.message !== 'Unauthorized' && error.message !== 'Forbidden') {
        logger.warn(requestId, error, username);
      }
    }
  }

  next(error);
};
