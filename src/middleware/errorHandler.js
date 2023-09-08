const winston = require('winston');

const errorHandler = (err, req, res, next) => {
    logger.error('An error occurred:', err);
    next();
}
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
});

module.exports = errorHandler;