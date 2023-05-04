import * as Joi from 'joi';
import * as winston from 'winston';

export enum LogLevels {
  Trace = 'trace',
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
  Fatal = 'fatal',
  Silent = 'silent',
}

export interface Logger extends winston.Logger {
  namespace: string;

  trace: (...msgs: unknown[]) => Logger;
  debug: (...msgs: unknown[]) => Logger;
  info: (...msgs: unknown[]) => Logger;
  warn: (...msgs: unknown[]) => Logger;
  error: (...msgs: unknown[]) => Logger;
  fatal: (...msgs: unknown[]) => Logger;
}

export interface RootLogger extends Logger {
  createLogger: (childNamespace: string, childOptions?: CreateChildLoggerOptions) => Logger;
}

export interface CreateRootLoggerOptions {
  consoleLevel: LogLevels;
  logPath: string;
  loggerOptions: winston.LoggerOptions;
  json: boolean;
}

export const ROOT_LOGGER_OPTIONS_SCHEMA = Joi.object()
  .keys({
    consoleLevel: Joi.string()
      .valid(...Object.values(LogLevels))
      .optional()
      .default(LogLevels.Info),
    logPath: Joi.string().optional(),
    loggerOptions: Joi.object().optional().default({}),
    json: Joi.boolean()
      .optional()
      // Callback for runtime-determining each time the function is used
      // This should probably be somewhere else...
      .default(() => (process.env.NODE_ENV === 'development' ? false : true)),
  })
  .options({
    stripUnknown: true,
  });

export interface CreateChildLoggerOptions {
  loggerOptions?: winston.LoggerOptions;
}
