const Users = require('./schemas/users');

// Authentication
const { hassPassword, checkPassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

// Error creator
const ErrorCreator = require('../middlewares/errorHandler/errorCreator');

// Logger
const logger = require('../utils/logger');

async function createUser(data) {
  try {
    data.password = await hassPassword(data.password);

    const user = await Users.create(data);

    logger.info(`User ${user.username} has been create`);

    return {
      status: 'success',
      message: `User '${data.username}' has been created`,
    };
  } catch (error) {
    logger.error(error);
    throw new ErrorCreator('User creation failure', 500);
  }
}

async function getUserByUsername(username) {
  const user = await Users.findOne({ username }).populate('employeeNumber');
  return user;
}

async function login(data) {
  try {
    const user = await getUserByUsername(data.username);

    if (!user) throw new ErrorCreator('Invalid username', 400);

    const isPwValid = await checkPassword(data.password, user.password);

    if (isPwValid) {
      logger.info(`User ${user.username} has logged in`, user.username);
      const token = generateToken(user);
      return { success: true, token };
    }

    throw new ErrorCreator('Invalid password', 400);
  } catch (error) {
    if (error.statusCode === 400) {
      logger.warn(error, data.username);
      throw error;
    }

    logger.error(error, data.username);
    throw new ErrorCreator('Internal Server Error', 500);
  }
}

module.exports = { createUser, login };
