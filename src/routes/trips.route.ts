import { Router } from 'express';
import { deleteTrip, getAllTrips, saveTrip } from '../controllers';
import { SaveTripSchema } from '../dto';
import { validateBody } from '../middlewares';
import { authMiddleware } from '../middlewares/auth.middleware';

const router: Router = Router();

/* Get all trips stored into the database by a user */
router.get('/', authMiddleware, getAllTrips);
/* Create a new trip  for a user*/
router.post('/', authMiddleware, validateBody(SaveTripSchema), saveTrip);
/* Delete a trip for a user*/
router.delete('/:id', authMiddleware, deleteTrip);

export const tripsRouter = router;
