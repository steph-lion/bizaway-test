import { HttpStatusCode } from 'axios';
import rateLimit from 'express-rate-limit';
import { env, logger } from '../modules';
import { ServerError } from '../types/serverError';

/**
 * Rate limiter middleware configuration
 * Restricts each IP to the configured number of requests per time window
 * Default: 180 requests per 60 seconds (configurable via environment variables)
 *
 * Environment variables:
 * - RATE_LIMIT_WINDOW_MS: Time window in milliseconds (default: 60000)
 * - RATE_LIMIT_MAX: Maximum number of requests per window (default: 180)
 * - RATE_LIMIT_STANDARD_HEADERS: Whether to include standard rate limit headers (default: true)
 */
export const rateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS, // Time window from environment or default 60 seconds
  limit: env.RATE_LIMIT_MAX, // Request limit from environment or default 180
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers

  // Custom handler for when the rate limit is exceeded
  handler: (request, _response, next) => {
    // Log the rate limit issue
    logger.warn({
      message: `Rate limit exceeded`,
      ip: request.ip,
      path: request.path,
      method: request.method,
      userAgent: request.headers['user-agent'],
      windowMs: env.RATE_LIMIT_WINDOW_MS,
      limit: env.RATE_LIMIT_MAX,
    });

    // Forward to error handler
    next(
      new ServerError('Too many requests, please try again later.', HttpStatusCode.TooManyRequests)
    );
  },

  // Add rate limit headers to successful responses as well
  skipSuccessfulRequests: false,
});
