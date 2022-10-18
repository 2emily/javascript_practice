import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
      format: winston.format.combine(winston.format.timestamp()),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // 색깔 넣어서 출력
        winston.format.simple() // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
      ),
    })
  );
}

function errorLogger(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const current_datetime = new Date();

  const dateFormatted =
    current_datetime.getFullYear() +
    '-' +
    (current_datetime.getMonth() + 1) +
    '-' +
    current_datetime.getDate() +
    ' ' +
    current_datetime.getHours() +
    ':' +
    current_datetime.getMinutes() +
    ':' +
    current_datetime.getSeconds();

  const method = req.method;
  const url = req.url;
  const errorContent = error.stack;

  logger.error(`[${dateFormatted}] ${method}:${url}\n${errorContent}\n\n`);
  const errorLog = `[${dateFormatted}] ${method}:${url}\n${errorContent}\n\n`;

  fs.appendFile('error.log', errorLog, (err) => {
    if (err) {
      console.log(err);
    }
  });

  next(error);
}

export { errorLogger };
