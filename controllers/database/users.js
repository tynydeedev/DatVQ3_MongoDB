const Users = require('./schemas/users');

// Authentication
const { hassPassword, checkPassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

// Error creator
const ErrorCreator = require('../middlewares/errorHandler/errorCreator');

// Logger
const logger = require('../utils/logger');

async function createUser(data) {
  data.password = await hassPassword(data.password);

  const user = await Users.create(data);

  return {
    status: 'success',
    message: `User '${data.username}' has been created`,
  };
}

async function getUserByUsername(username) {
  const user = await Users.findOne({ username }).populate('employeeNumber');
  return user;
}

async function login(data) {
  const user = await getUserByUsername(data.username);

  if (!user) {
    logger.warn(`Invalid username ${data.username}`);
    throw new ErrorCreator(`Invalid username`, 400);
  }

  const isPwValid = await checkPassword(data.password, user.password);

  if (isPwValid) {
    logger.info(`User ${user.username} has logged in`, user.username);
    const token = generateToken(user);
    return { success: true, token };
  }

  logger.warn(`Invalid password for username: ${data.username}`, data.username);
  throw new ErrorCreator('Invalid password', 400);
}

module.exports = { createUser, login };
