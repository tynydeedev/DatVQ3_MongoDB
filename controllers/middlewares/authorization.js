const jwt = require('jsonwebtoken');
const ErrorCreator = require('./errorHandler/errorCreator');
const logger = require('../utils/logger');

module.exports = function auth(roles) {
  return function (req, res, next) {
    if (!req.headers.authorization) {
      logger.info(`Unknown user sent a ${req.method} request to ${req.originalUrl}.`);
      throw new ErrorCreator('Unauthorized', 401);
    }

    const token = req.headers.authorization.replace('Bearer ', '');

    try {
      var data = jwt.verify(token, process.env.JWTSECRET);
    } catch (error) {
      logger.warn(`JWT token error: ${token}`);
      logger.error(error);
      throw new ErrorCreator(error.message, 400);
    }

    if (!data.jobTitle) {
      logger.warn(`Unknown user sent a ${req.method} request to ${req.originalUrl}`, data.username);
      throw new ErrorCreator('Unauthorized', 401);
    }

    if (roles.includes(data.jobTitle)) {
      res.locals.tokenData = data;
      return next();
    }

    logger.warn(
      `${data.jobTitle} number ${data._id} sent a ${req.method} request to ${req.originalUrl}`,
      data.username
    );
    throw new ErrorCreator('Forbidden', 403);
  };
};
