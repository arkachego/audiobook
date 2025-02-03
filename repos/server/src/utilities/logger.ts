import Winston from "winston";

const logger = Winston.createLogger({
  level: "info",
  format: Winston.format.combine(
    Winston.format.colorize(),
    Winston.format.timestamp(),
    Winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    }),
  ),
  transports: [
    new Winston.transports.Console({
      format: Winston.format.combine(
        Winston.format.colorize(),
        Winston.format.simple(),
      ),
    }),
  ],
});

class LogStream {
  write(message: string) {
    logger.info(message.trim());
  }
};

export default logger;
export { LogStream };
