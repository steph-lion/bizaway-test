import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { logger } from '../modules';
import { ServerError } from '../types/serverError';

/**
 * Centralized error handling middleware for Express
 * Handles different types of errors and sends appropriate responses
 */
export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  // Log every error for debugging
  if (error instanceof Error) {
    logger.error(`Error: ${error.message}`);
  } else {
    logger.error('Unknown error occurred');
  }

  /**
   * Handle specific error types
   */
  if (error instanceof ServerError) {
    res.status(error.code).json({
      status: 'error',
      message: error.message,
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(HttpStatusCode.BadRequest).json({
      status: 'error',
      message: 'Validation failed',
      errors: error.errors.map((err) => ({
        message: err.message,
        params: err.path,
      })),
    });
    return;
  }

  // Handle generic errors
  res.status(HttpStatusCode.InternalServerError).json({
    status: 'error',
    message: 'Internal server error',
  });
};
