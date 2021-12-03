// Init the route
const router = require('express').Router();

// Validation middleware
const { validateRegisterUser } = require('../controllers/middlewares/validators/users');

// Database functions
const { createUser, login } = require('../controllers/database/users');

// Other utils
const ErrorCreator = require('../controllers/middlewares/errorHandler/errorCreator');
const { errorWrapper } = require('../controllers/middlewares/errorHandler/errorHandler');
const logger = require('../controllers/middlewares/logger/logger');

router.post(
  '/register',
  validateRegisterUser,
  errorWrapper(async (req, res, next) => {
    const requestId = res.locals.requestId;
    const result = await createUser(req.body);

    logger.info(requestId, `User ${user.username} created`);
    return res.send(result);
  })
);

router.post(
  '/login',
  errorWrapper(async (req, res, next) => {
    const requestId = res.locals.requestId;
    const { username, password } = req.body;

    if (!username || !password) {
      logger.warn(requestId, 'Missing credential(s) - POST - /login', username);
      throw new ErrorCreator('Missing credential(s)', 400);
    }

    const result = await login(req.body);

    logger.info(requestId, `User ${username} has logged in`, username);

    return res.send(result);
  })
);

module.exports = router;
