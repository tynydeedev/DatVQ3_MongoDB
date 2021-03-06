const fs = require('fs');
const path = require('path');

const config = {
  logLevel: undefined,
};

function changeLogLevel(level) {
  config.logLevel = level;
  fs.writeFileSync(
    path.join(process.cwd(), 'controllers', 'config', 'logConfig.json'),
    JSON.stringify(config, null, 2)
  );
  return 'success';
}

function getLogLevel() {
  const data = fs.readFileSync(path.join(process.cwd(), 'controllers', 'config', 'logConfig.json'));
  const configData = JSON.parse(data);
  config.logLevel = configData.logLevel;
}

function checkLogLevel() {
  getLogLevel();
  setInterval(getLogLevel, 30000);
}

module.exports = { config, changeLogLevel, getLogLevel, checkLogLevel };
