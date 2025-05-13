import { Router } from 'express';
import { TripsController } from '../controllers/trips.controller';
import { SaveTripSchema } from '../dto/saveTrip.dto';
import { ValidateTripIdSchema } from '../dto/validateTripId';
import { authMiddleware } from '../middlewares';
import { validateBody, validateParams } from '../middlewares/validateRequest.middleware';

export const tripsRouter = Router();

/**
 * @swagger
 * /api/trips:
 *   get:
 *     summary: Retrieve all user trips
 *     description: Retrieves the list of all trips saved by the authenticated user
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of saved trips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       429:
 *         description: Rate limit exceeded
 *       500:
 *         description: Server error
 */
tripsRouter.get('/', authMiddleware, TripsController.getAll);

/**
 * @swagger
 * /api/trips/{id}:
 *   get:
 *     summary: Retrieve a specific trip
 *     description: Retrieves the details of a specific trip for the authenticated user
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the trip to retrieve
 *     responses:
 *       200:
 *         description: Trip details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Trip not found
 *       429:
 *         description: Rate limit exceeded
 *       500:
 *         description: Server error
 */
tripsRouter.get(
  '/:id',
  authMiddleware,
  validateParams(ValidateTripIdSchema),
  TripsController.getOne
);

/**
 * @swagger
 * /api/trips:
 *   post:
 *     summary: Save a new trip
 *     description: Saves a trip found through search for the authenticated user
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               original_id:
 *                 type: string
 *                 description: Original ID of the trip to save
 *             required:
 *               - original_id
 *     responses:
 *       201:
 *         description: Trip successfully saved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       400:
 *         description: Invalid parameters
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       429:
 *         description: Rate limit exceeded
 *       500:
 *         description: Server error
 */
tripsRouter.post('/', authMiddleware, validateBody(SaveTripSchema), TripsController.create);

/**
 * @swagger
 * /api/trips/{id}:
 *   delete:
 *     summary: Delete a trip
 *     description: Deletes a saved trip of the authenticated user
 *     tags: [Trips]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the trip to delete
 *     responses:
 *       200:
 *         description: Trip successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Trip not found
 *       429:
 *         description: Rate limit exceeded
 *       500:
 *         description: Server error
 */
tripsRouter.delete(
  '/:id',
  authMiddleware,
  validateParams(ValidateTripIdSchema),
  TripsController.delete
);
