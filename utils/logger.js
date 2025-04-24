const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const logLevels = {
    levels: {
        info: 0,
        warn: 1,
        error: 2,
    },
    colors: {
        info: "green",
        warn: "yellow",
        error: "red",
    },
};

const logger = winston.createLogger({
    levels: logLevels.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.printf(
                    ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
                )
            ),
        }),
        new DailyRotateFile({
            filename: "logs/app-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        }),
    ],
});

winston.addColors(logLevels.colors);

module.exports = logger;
