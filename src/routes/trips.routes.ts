import { Router } from 'express';
import { TripsController } from '../controllers/trips.controller';
import { SaveTripSchema } from '../dto/saveTrip.dto';
import { ValidateTripIdSchema } from '../dto/validateTripId';
import { authMiddleware } from '../middlewares';
import { validateBody, validateParams } from '../middlewares/validateRequest.middleware';

export const tripsRouter = Router();

/**
 * GET /api/trips
 * Get all trips for the authenticated user
 */
tripsRouter.get('/', authMiddleware, TripsController.getAll);

/**
 * GET /api/trips/:id
 * Get a specific trip by ID for the authenticated user
 */
tripsRouter.get(
  '/:id',
  authMiddleware,
  validateParams(ValidateTripIdSchema),
  TripsController.getOne
);

/**
 * POST /api/trips
 * Create a new trip for the authenticated user
 */
tripsRouter.post('/', authMiddleware, validateBody(SaveTripSchema), TripsController.create);

/**
 * DELETE /api/trips/:id
 * Delete a trip by ID for the authenticated user
 */
tripsRouter.delete(
  '/:id',
  authMiddleware,
  validateParams(ValidateTripIdSchema),
  TripsController.delete
);
