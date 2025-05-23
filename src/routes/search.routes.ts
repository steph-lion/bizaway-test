import { Router } from 'express';
import { SearchController } from '../controllers/search.controller';
import { SearchTripSchema } from '../dto/searchTrip.dto';
import { validateQuery } from '../middlewares';

export const searchRouter = Router();

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search for trips between destinations
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: origin
 *         required: true
 *         schema:
 *           type: string
 *           enum: ["ATL", "PEK", "LAX", "DXB", "HND", "ORD", "LHR", "PVG", "CDG", "DFW", "AMS", "FRA", "IST", "CAN", "JFK", "SIN", "DEN", "ICN", "BKK", "SFO", "LAS", "CLT", "MIA", "KUL", "SEA", "MUC", "EWR", "MAD", "HKG", "MCO", "PHX", "IAH", "SYD", "MEL", "GRU", "YYZ", "LGW", "BCN", "MAN", "BOM", "DEL", "ZRH", "SVO", "DME", "JNB", "ARN", "OSL", "CPH", "HEL", "VIE"]
 *         description: 3-letter IATA code for the origin airport
 *       - in: query
 *         name: destination
 *         required: true
 *         schema:
 *           type: string
 *           enum: ["ATL", "PEK", "LAX", "DXB", "HND", "ORD", "LHR", "PVG", "CDG", "DFW", "AMS", "FRA", "IST", "CAN", "JFK", "SIN", "DEN", "ICN", "BKK", "SFO", "LAS", "CLT", "MIA", "KUL", "SEA", "MUC", "EWR", "MAD", "HKG", "MCO", "PHX", "IAH", "SYD", "MEL", "GRU", "YYZ", "LGW", "BCN", "MAN", "BOM", "DEL", "ZRH", "SVO", "DME", "JNB", "ARN", "OSL", "CPH", "HEL", "VIE"]
 *         description: 3-letter IATA code for the destination airport
 *       - in: query
 *         name: sort_by
 *         schema:
 *           type: string
 *           enum: [fastest, cheapest]
 *           default: fastest
 *         description: Sorting strategy (fastest or cheapest)
 *     responses:
 *       200:
 *         description: List of available trips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExternalTrip'
 *       400:
 *         description: Invalid search parameters
 *       429:
 *         description: Rate limit exceeded
 *       500:
 *         description: Server error
 */
searchRouter.get('/', validateQuery(SearchTripSchema), SearchController.searchTrips);
