import dotenv from 'dotenv';
import { z } from 'zod';
import { logger } from './logger.module';

/**
 *  This modules types and validates the environment variables using Zod, making sure they are set correctly.
 */

// Load environment variables from .env file
dotenv.config();

// Define schema for environment variables
const envSchema = z.object({
  // Common configuration
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),

  // Express
  SERVER_PORT: z.string().default('5000'),

  // Rate Limiter
  RATE_LIMIT_WINDOW_MS: z.string().default('60000').transform(Number), // 60 seconds
  RATE_LIMIT_MAX: z.string().default('180').transform(Number), // 180 requests per window

  // External API
  TRIPS_API_BASE_URL: z.string().url(),
  TRIPS_API_KEY: z.string(),

  // Prisma
  DB_URL: z.string(),
  DB_PORT: z.string().default('5432').transform(Number),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
});

// Validate and extract environment variables
const validateEnv = (): z.infer<typeof envSchema> => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error(`Invalid environment variables: ${error.message}`);
      process.exit(1);
    }
    logger.error(`Unknown error during environment validation: ${error}`);
    process.exit(1);
  }
};

// Export validated environment variables
export const env = validateEnv();

// Export the type for use elsewhere
export type Env = z.infer<typeof envSchema>;
