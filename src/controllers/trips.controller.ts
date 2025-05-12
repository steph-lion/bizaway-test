import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { SaveTripBody } from '../dto/saveTrip.dto';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { TripService } from '../services';
import { ServerError } from '../types/serverError';

/**
 * Controller handling CRUD operations for trips
 */
export class TripsController {
  /**
   * Get all trips for the authenticated user
   */
  public static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { user } = req as AuthenticatedRequest;
      const trips = await TripService.getUserTrips(user.id);
      res.status(HttpStatusCode.Ok).json(trips);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a specific trip by ID for the authenticated user
   */
  public static async getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tripId = Number(req.params.id);
      const { user } = req as AuthenticatedRequest;
      const trip = await TripService.getUserTrip(tripId, user.id);
      res.status(HttpStatusCode.Ok).json(trip);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a new trip for the authenticated user
   */
  public static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { original_id }: SaveTripBody = req.body;
      const { user } = req as AuthenticatedRequest;

      // Save the trip
      const savedTrip = await TripService.saveTrip(original_id, user.id);

      res.status(HttpStatusCode.Created).json(savedTrip);
    } catch (error) {
      if (error instanceof ServerError && error.code === HttpStatusCode.Conflict) {
        res.status(HttpStatusCode.Conflict).json({
          message: 'A trip with this original_id already exists for this user',
        });
        return;
      }
      next(error);
    }
  }

  /**
   * Delete a trip by ID for the authenticated user
   */
  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tripId = Number(req.params.id);
      const { user } = req as AuthenticatedRequest;

      const deletedTrip = await TripService.deleteTrip(tripId, user.id);
      res.status(HttpStatusCode.Ok).json(deletedTrip);
    } catch (error) {
      next(error);
    }
  }
}
