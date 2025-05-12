import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { expressIncomingRequest, rateLimiter } from './middlewares';
import { env, logger } from './modules';
import { searchRouter, tripsRouter } from './routes';

/**
 * Load environment variables from .env file
 */
dotenv.config();

/**
 * Express application initialization
 */
const app = express();
const port = env.SERVER_PORT;

/**
 * Middlewares
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressIncomingRequest);
app.use(rateLimiter);

/**
 * Health check endpoint
 */
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Server is up and running',
  });
});

/**
 * API routes
 */
app.use('/api/trips', tripsRouter);
app.use('/api/search', searchRouter);

/**
 * Global error handler - must be last middleware
 */
import { errorHandler } from './middlewares';
app.use(errorHandler);

/**
 * Server start
 */
app.listen(port, () => {
  logger.info(`Server up and running at http://localhost:${port}`);
});
