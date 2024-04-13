import { Router } from 'express';
import { validateSession } from '../../middlewares/validateSession';
import { validateSchema } from '../../middlewares/validateSchema';
import { createRoomHandler, deleteRoomHandler, getRoomsHandler, updateRoomHandler } from './rooms.controller';
import { insertRoomSchema } from './rooms.schema';

const router = Router();

router.get('/', validateSession, getRoomsHandler);
router.post('/', validateSession, validateSchema(insertRoomSchema), createRoomHandler);

router.patch('/:id', validateSession, validateSchema(insertRoomSchema.partial()), updateRoomHandler);

router.delete('/:id', validateSession, deleteRoomHandler);

export const roomsRoute = router;
