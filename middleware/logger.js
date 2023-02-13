const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logger.log',
    }),
  ],
});

const loggingMiddleware = (req, res, next) => {
  logger.info(`${req.method} request received at endpoint ${req.url}`);
  next();
};

module.exports = loggingMiddleware;
