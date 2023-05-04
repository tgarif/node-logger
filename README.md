# @tgarif/logger

[![npm](https://img.shields.io/npm/v/@tgarif/logger?color=a1b858&label=)](https://npmjs.com/package/@tgarif/logger)

## Installation

```bash
npm i @tgarif/logger
```

## Usage

```javascript
const createLogger = require('@tgarif/logger');

const logger = createLogger('app', {
  consoleLevel: process.env.LOG_LEVEL || 'info',
  logPath: process.cwd() + '/logs',
  // Winston logger options
  loggerOptions: {
    silent: false,
  },
});

logger('information about regular operation');
// 2019-01-31T10:40:31Z  INFO [app] information about regular operation

logger.fatal('unrecoverable error, an operator should look at this as soon as possible');
// 2019-01-31T10:40:31Z FATAL [app] unrecoverable error, an operator should look at this as soon as possible

logger.error('recoverable error');
// 2019-01-31T10:40:31Z ERROR [app] recoverable error

logger.warn('warning');
// 2019-01-31T10:40:31Z  WARN [app] warning

logger.info('information about regular operation');
// 2019-01-31T10:40:31Z  INFO [app] information about regular operation

logger.debug('debug information, perhaps useful during development or troubleshooting');
// 2019-01-31T10:40:31Z DEBUG [app] debug information, perhaps useful during development or troubleshooting

logger.trace('highly detailed information');
// 2019-01-31T10:40:31Z TRACE [app] highly detailed information

// Add another Console transport, just for kicks.
logger.add(new winston.transport.Console());
```

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Tengku Arif](https://github.com/tgarif)
