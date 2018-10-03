const path = require('path');
const winston = require('winston');
const fs = require('fs');

const logsDir = path.join(__dirname, './../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const options = {
  file: {
    level: 'info',
    filename: `${logsDir}/server.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    colorize: true,
    json: false,
  },
};

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

module.exports = logger;
