import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { SearchTripParams } from '../dto/searchTrip.dto';
import { SearchService } from '../services';

/**
 * Controller handling search operations
 */
export class SearchController {
  /**
   * Search for trips matching the query parameters
   */
  public static async searchTrips(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // The params have already been validated by zod middleware
      const { origin, destination, sort_by = 'fastest' } = req.query as unknown as SearchTripParams;

      const trips = await SearchService.searchTrips(origin, destination, sort_by);

      res.status(HttpStatusCode.Ok).json(trips);
    } catch (error) {
      next(error);
    }
  }
}
