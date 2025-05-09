import { Router } from 'express';
import { searchTrip } from '../controllers';
import { SearchTripSchema } from '../dto/searchTrip.dto';
import { validateQuery } from '../middlewares';

const router: Router = Router();

router.get('/', validateQuery(SearchTripSchema), searchTrip);

export const searchRouter = router;
