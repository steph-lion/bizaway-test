import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserRepository } from '../repositories';
import { ServerError } from '../types/serverError';

/**
 * Extended Request interface to include the authenticated user
 */
export interface AuthenticatedRequest extends Request {
  user: JWTUserPayload;
}

export interface JWTUserPayload {
  id: number;
  name: string;
  email: string;
}

/**
 * Authentication middleware to validate JWT tokens
 * For this simplified version, we're just looking up the token in the database
 */
export const authMiddleware: RequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check if the authorization header exists and has the correct format
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ServerError('Unauthorized: No token provided', 401);
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    // Find the user with this token using the repository
    const user = await UserRepository.findByToken(token);

    if (!user) {
      throw new ServerError('Unauthorized: Invalid token', 401);
    }

    // Attach the user to the request object
    (req as AuthenticatedRequest).user = user;

    // Continue with the request
    next();
  } catch (error) {
    // Pass the error to the error handler
    next(error);
  }
};
