import { HttpStatusCode } from 'axios';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { prisma } from '../services';

/**
 * Controller to handle fetching all trips for a user
 */
export const getAllTrips = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { user } = req;
  try {
    // Fetch all trips from the database
    const trips = await prisma.trip.findMany({
      where: { user_id: user?.id },
    });
    res.status(HttpStatusCode.Ok).json(trips);
  } catch (error) {
    next(error);
  }
};
