import { NextFunction, Request, Response } from 'express';
import { logger } from '../modules/logger.module';

/**
 * This middleware logs the details of incoming requests for debugging purposes.
 */

export const expressIncomingRequest = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Simply log the incoming request details
    logger.debug(`Incoming request: [${req.method}] ${req.url}`);
    next();
  } catch (error) {
    next(error);
  }
};
