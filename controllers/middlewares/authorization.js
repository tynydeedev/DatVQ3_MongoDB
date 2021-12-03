const jwt = require('jsonwebtoken');
const ErrorCreator = require('./errorHandler/errorCreator');
const logger = require('./logger/logger');

module.exports = function auth(roles) {
  return function (req, res, next) {
    const requestId = res.locals.requestId;

    if (!req.headers.authorization) {
      logger.info(requestId, `Unknown user sent a ${req.method} request to ${req.originalUrl}.`);
      throw new ErrorCreator('Unauthorized', 401);
    }

    const token = req.headers.authorization.replace('Bearer ', '');

    try {
      var data = jwt.verify(token, process.env.JWTSECRET);
    } catch (error) {
      logger.warn(requestId, `JWT token error: ${token}`);
      logger.error(requestId, error);
      throw new ErrorCreator(error.message, 400);
    }

    if (!data.jobTitle) {
      logger.warn(requestId, `JWT token does not contain 'jobTitle'`, data.username);
      throw new ErrorCreator('Unauthorized', 401);
    }

    res.locals.tokenData = data;

    if (roles.includes(data.jobTitle)) {
      const { query, params, body } = req;
      logger.info(
        requestId,
        `${data.jobTitle} id ${data._id} - ${req.method} - ${req.originalUrl}`,
        data.username,
        query,
        params,
        body
      );
      return next();
    }

    logger.warn(requestId, `${data.jobTitle} id ${data._id} - ${req.method} - ${req.originalUrl}`, data.username);
    throw new ErrorCreator('Forbidden', 403);
  };
};
