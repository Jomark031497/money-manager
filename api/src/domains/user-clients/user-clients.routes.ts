import { Router } from 'express';
import { validateSchema } from '../../middlewares/validateSchema';
import { insertUserClientsSchema } from './user-clients.schema';
import { addUserClientHandler } from './user-clients.controller';

const router = Router();

router.post('/', validateSchema(insertUserClientsSchema), addUserClientHandler);

export const userClientsRoutes = router;
