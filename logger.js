const winston = require('winston');

// Configure the logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'combined.log' })
    ],
});

// Example log entry
logger.info('Logger initialized');

module.exports = logger;
