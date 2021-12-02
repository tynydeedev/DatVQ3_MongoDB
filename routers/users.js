// Init the route
const router = require('express').Router();

// Validation middleware
const { validateRegisterUser } = require('../controllers/middlewares/validators/users');

// Database functions
const { createUser, login } = require('../controllers/database/users');

// Other utils
const ErrorCreator = require('../controllers/middlewares/errorHandler/errorCreator');
const { errorWrapper } = require('../controllers/middlewares/errorHandler/errorHandler');
const logger = require('../controllers/utils/logger');

router.post(
  '/register',
  validateRegisterUser,
  errorWrapper(async (req, res, next) => {
    const { username } = req.body;

    const result = await createUser(req.body);

    return res.send(result);
  })
);

router.post(
  '/login',
  errorWrapper(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new ErrorCreator('Missing credential(s)', 400);
    }

    const result = await login(req.body);

    return res.send(result);
  })
);

module.exports = router;
