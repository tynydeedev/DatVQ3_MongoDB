const Users = require('./schemas/users');

// Authentication
const { hassPassword, checkPassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

// Error creator
const ErrorCreator = require('../middlewares/errorHandler/errorCreator');

async function createUser(data) {
  data.password = await hassPassword(data.password);

  await Users.create(data);

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
    throw new ErrorCreator(`Invalid username: ${data.username}`, 400);
  }

  const isPwValid = await checkPassword(data.password, user.password);

  if (isPwValid) {
    const token = generateToken(user);
    return { success: true, token };
  }

  throw new ErrorCreator(`Invalid password - username: ${data.username}`, 400);
}

module.exports = { createUser, login };
