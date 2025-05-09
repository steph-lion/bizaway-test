import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

/**
 * Creates a middleware to validate request query parameters against a Zod schema
 */
export const validateQuery = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      // Parse and validate query parameters
      await schema.parseAsync(req.query);
      next();
    } catch (error) {
      next(error);
      return;
    }
  };
};

/**
 * Creates a middleware to validate request body against a Zod schema
 */
export const validateBody = (schema: AnyZodObject) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      // Parse and validate request body
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
      return;
    }
  };
};
