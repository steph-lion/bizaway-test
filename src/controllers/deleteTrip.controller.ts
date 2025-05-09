import { Prisma } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../services';

export const deleteTrip = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    // Delete the trip with the specified ID from the database
    const deletedTrip = await prisma.trip.delete({
      where: { id: Number(id) },
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
