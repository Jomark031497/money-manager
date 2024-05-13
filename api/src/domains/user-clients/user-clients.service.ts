import { InferInsertModel, and, eq } from 'drizzle-orm';
import { userClients } from './user-clients.schema';
import { getUserById } from '../users/users.service';
import { AppError } from '../../utils/AppError';
import { db } from '../../db';

export const addUserClients = async (payload: InferInsertModel<typeof userClients>) => {
  // check if the clientId and friendId exists in the user table
  const clientExists = await getUserById(payload.clientId);
  const friendExists = await getUserById(payload.friendId);

  if (!clientExists || !friendExists)
    throw new AppError(404, 'unable to add user client', {
      ...(!clientExists && {
        clientId: 'client id not found',
      }),
      ...(!friendExists && {
        friendId: 'friend id not found',
      }),
    });

  // duplicate check; ensure that the clientId will not be duplicated
  const clientExistsInFriendClients = await db
    .select()
    .from(userClients)
    .where(and(eq(userClients.clientId, payload.clientId), eq(userClients.friendId, payload.friendId)));

  if (clientExistsInFriendClients)
    throw new AppError(400, 'unable to add user client', {
      clientId: "clientId already exists in the friend's client list",
    });

  await db.insert(userClients).values(payload);

  return { message: 'user client added' };
};
