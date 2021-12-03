const { createLog } = require('../../database/logs');
const { config } = require('../../utils/logConfig');

module.exports = class Logger {
  static error(requestId, error, username) {
    const timestamp = new Date();
    const level = 'error';
    createLog({
      requestId,
      timestamp,
      level,
      username: username || 'unknown',
      message: error.message,
      stack: error.stack,
    }).catch(err => console.error(err));
  }

  static warn(requestId, error, username) {
    if (config.logLevel === 'error') return;
    const timestamp = new Date();
    const level = 'warn';
    createLog({
      requestId,
      timestamp,
      level,
      username: username || 'unknown',
      message: error.message || error,
      stack: error.stack,
    }).catch(err => console.error(err));
  }

  static info(requestId, message, username, query, params, body) {
    if (config.logLevel !== 'info') return;
    const timestamp = new Date();
    const level = 'info';
    createLog({
      requestId,
      timestamp,
      level,
      username: username || 'unknown',
      message: message,
      query,
      params,
      body,
    }).catch(err => console.error(err));
  }

  static system(requestId, message, username) {
    const timestamp = new Date();
    const level = 'system';
    createLog({
      requestId,
      timestamp,
      level,
      username: username || 'unknown',
      message: message,
    }).catch(err => console.error(err));
  }
};
