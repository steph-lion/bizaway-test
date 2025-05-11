import { Prisma } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { NextFunction, Response } from 'express';
import { SaveTripBody } from '../dto/saveTrip.dto';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { externalTripsInstance, prisma } from '../services';
import { ExternalTrip } from '../types/trip';

export const saveTrip = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user } = req;
  const { original_id }: SaveTripBody = req.body;

  try {
    // Fetch the original trip from 3rd party API
    const response = await externalTripsInstance.request({
      method: 'GET',
      url: `/${original_id}`,
    });
    if (response.status !== 200) {
      res.status(response.status).json({
        message: response.statusText,
      });
    }
    const trip: ExternalTrip = response.data;
    // Save a new trip in the database with the data from the 3rd party API
    const savedTrip = await prisma.trip.create({
      data: {
        user_id: user!.id,
        original_id: trip.id,
        origin: trip.origin,
        destination: trip.destination,
        cost: trip.cost,
        duration: trip.duration,
        display_name: trip.display_name,
        type: trip.type,
      },
    });
    res.status(201).json(savedTrip);
  } catch (error) {
    // We need to check this specific error since Prisma throws an error when a record is duplicated
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      res.status(HttpStatusCode.Conflict).json({
        message: 'A trip with this original_id already exists for this user',
      });
    }
    next(error);
  }
};
