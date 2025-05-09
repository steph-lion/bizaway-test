import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '../services';

export const getAllTrips = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all trips from the database
    const trips = await prisma.trip.findMany();
    res.status(HttpStatusCode.Ok).json(trips);
  } catch (error) {
    next(error);
  }
};
