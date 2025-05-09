import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { CreateTripBody } from '../dto/createTrip.dto';
import { prisma } from '../services';

export const createTrip = async (req: Request, res: Response, next: NextFunction) => {
  const { origin, destination, cost, duration, type }: CreateTripBody = req.body;
  try {
    // Since the 3rd party API does not allow a trip search by ID, we need to create a trip in our database with custom values
    const trip = await prisma.trip.create({
      data: {
        origin,
        destination,
        cost,
        duration,
        type,
        display_name: `from ${origin} to ${destination} by ${type}`,
      },
    });
    res.status(HttpStatusCode.Created).json(trip);
  } catch (error) {
    next(error);
  }
};
