"use strict";
/**
 * Setup the winston logger.
 *
 * Documentation: https://github.com/winstonjs/winston
 */
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
// Import Functions
const { File, Console } = winston_1.transports;
// Init Logger
const winstonLogger = winston_1.createLogger({
    level: 'info',
});
/**
 * For production write to all logs with level `info` and below
 * to `combined.log. Write all logs error (and below) to `error.log`.
 * For development, print to the console.
 */
if (process.env.NODE_ENV === 'production') {
    const fileFormat = winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json());
    const errTransport = new File({
        filename: './logs/error.log',
        format: fileFormat,
        level: 'error',
    });
    const infoTransport = new File({
        filename: './logs/combined.log',
        format: fileFormat,
    });
    winstonLogger.add(errTransport);
    winstonLogger.add(infoTransport);
}
else {
    const errorStackFormat = winston_1.format((info) => {
        if (info.stack) {
            // tslint:disable-next-line:no-console
            console.log(info.stack);
            return false;
        }
        return info;
    });
    const consoleTransport = new Console({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple(), errorStackFormat()),
    });
    winstonLogger.add(consoleTransport);
}
// Export logger
exports.logger = winstonLogger;
//# sourceMappingURL=Logger.js.map