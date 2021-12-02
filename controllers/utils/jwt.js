const jwt = require('jsonwebtoken');

function generateToken(user) {
  const { username } = user;
  const { _id, officeCode, jobTitle } = user.employeeNumber;
  return jwt.sign({ username, _id, officeCode, jobTitle }, process.env.JWTSECRET, { expiresIn: '1h' });
}

module.exports = { generateToken };
