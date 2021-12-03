const fs = require('fs');
const path = require('path');

const config = {
  logLevel: 'info',
};

function changeLogLevel(level) {
  config.logLevel = level;
  fs.writeFileSync(path.join(process.cwd(), 'controllers', 'config', 'config.json'), JSON.stringify(config, null, 2));
  return 'success';
}

function getLogLevel() {
  const data = fs.readFileSync(path.join(process.cwd(), 'controllers', 'config', 'config.json'));
  const configData = JSON.parse(data);
  config.logLevel = configData.logLevel;
}

function checkLogLevel() {
  getLogLevel();
  setInterval(getLogLevel, 30000);
}

module.exports = { config, changeLogLevel, getLogLevel, checkLogLevel };
