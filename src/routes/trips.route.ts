import { Router } from 'express';
import { createTrip } from '../controllers/createTrip.controller';
import { deleteTrip } from '../controllers/deleteTrip.controller';
import { getAllTrips } from '../controllers/getAllTrips.controller';
import { CreateTripSchema } from '../dto/createTrip.dto';
import { validateBody } from '../middlewares';

const router: Router = Router();

/* Get all trips stored into the database */
router.get('/', getAllTrips);
/* Create a new trip */
router.post('/', validateBody(CreateTripSchema), createTrip);
/* Delete a trip */
router.delete('/:id', deleteTrip);

export const tripsRouter = router;
