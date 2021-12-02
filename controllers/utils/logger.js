const createLog = require('../database/logs');

module.exports = class Logger {
  static error(error, user) {
    const timestamp = new Date();
    const level = 'error';
    createLog({
      timestamp,
      level,
      user: user || 'unknown',
      message: error.message,
      stack: error.stack,
    }).catch(err => console.error(err));
  }

  static warn(error, user) {
    const timestamp = new Date();
    const level = 'warn';
    createLog({
      timestamp,
      level,
      user: user || 'unknown',
      message: error.message || error,
      stack: error.stack,
    }).catch(err => console.error(err));
  }

  static info(message, user, query, params, body) {
    const timestamp = new Date();
    const level = 'info';
    createLog({
      timestamp,
      level,
      user: user || 'unknown',
      message: message,
      query,
      params,
      body,
    }).catch(err => console.error(err));
  }
};
