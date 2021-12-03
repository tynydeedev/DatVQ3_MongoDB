const Logs = require('./schemas/logs');

const { validateLogInput } = require('../middlewares/validators/logs');

async function createLog(logData) {
  try {
    const validLogData = await validateLogInput(logData);
    await Logs.create(validLogData);
  } catch (error) {
    console.log('Error @createLog', error);
    throw error;
  }
}

async function getLog(requirements) {
  const fromTime = requirements.fromTime || new Date(0);
  const toTime = requirements.toTime || new Date();

  const result = await Logs.find({ ...requirements, timestamp: { $gt: fromTime, $lt: toTime } });
  return result;
}

module.exports = { createLog, getLog };
