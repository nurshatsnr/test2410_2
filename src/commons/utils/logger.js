const logLevels = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLogLevel = logLevels[process.env.LOG_LEVEL] || logLevels.debug;

function logMessage(level, message, ...additional) {
  if (logLevels[level] < currentLogLevel) {
    return;
  }

  const timestamp = new Date().toISOString();
  const logBody = JSON.stringify({ timestamp, level, message, additional });

  switch (level) {
    case 'debug':
      console.debug(logBody);
      break;
    case 'info':
      console.info(logBody);
      break;
    case 'warn':
      console.warn(logBody);
      break;
    case 'error':
      console.error(logBody);
      break;
    default:
      console.log(logBody);
      break;
  }
}

const logger = {
  debug(message, ...additional) {
    logMessage('debug', message, ...additional);
  },
  info(message, ...additional) {
    logMessage('info', message, ...additional);
  },
  warn(message, ...additional) {
    logMessage('warn', message, ...additional);
  },
  error(message, ...additional) {
    logMessage('error', message, ...additional);
  },
};

export let log = logger;