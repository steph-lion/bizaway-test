import { pino } from 'pino';

/**
 * This module is responsible for logging in the entire application.
 */

const logger = pino({
  level: 'trace',
  transport: {
    target: 'pino-pretty',
  },
});

export { logger };
