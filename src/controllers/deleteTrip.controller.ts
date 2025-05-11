import { Prisma } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { prisma } from '../services';

/**
 * Controller to handle deleting a trip for a user
 */

export const deleteTrip = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { user } = req;
  try {
    // Delete the trip with the specified ID from the database
    const deletedTrip = await prisma.trip.delete({
      where: { id: Number(id), user_id: user?.id },
    });
    res.status(HttpStatusCode.Ok).json(deletedTrip);
  } catch (error) {
    // We need to check this specific error since Prisma throws an error when a record is not found
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      // Trip not found
      res.status(HttpStatusCode.NotFound).json({ message: 'Trip not found' });
      return;
    }
    next(error);
  }
};
