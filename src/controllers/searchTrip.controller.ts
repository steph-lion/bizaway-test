import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { SearchTripParams } from '../dto/searchTrip.dto';
import externalTripsInstance from '../services/axios.service';
import { ExternalTrip } from '../types/trip';

/**
 * Controller to handle trip search requests by all the users
 */
export const searchTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const params = req.query as unknown;
    const { origin, destination, sort_by } = params as SearchTripParams;

    const response = await externalTripsInstance.request({
      method: 'GET',
      params: {
        origin,
        destination,
        sort_by,
      },
    });
    const trips: ExternalTrip[] = response.data;
    if (sort_by === 'fastest') {
      trips.sort((a, b) => a.duration - b.duration);
    } else {
      trips.sort((a, b) => a.cost - b.cost);
    }

    if (response.status >= 200 && response.status < 300) {
      // Handle successful response
      res.status(HttpStatusCode.Ok).json(trips);
    } else {
      res.status(response.status).json({
        message: response.statusText,
      });
    }
  } catch (error) {
    next(error);
  }
};
