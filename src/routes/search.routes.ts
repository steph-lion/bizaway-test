import { Router } from 'express';
import { SearchController } from '../controllers/search.controller';
import { SearchTripSchema } from '../dto/searchTrip.dto';
import { validateQuery } from '../middlewares';

export const searchRouter = Router();

/**
 * GET /api/search
 * Search for trips matching query parameters
 */
searchRouter.get('/', validateQuery(SearchTripSchema), SearchController.searchTrips);
