import { asyncHandler } from '../../utils/asyncHandler.js';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from './users.service.js';

export const createUserHandler = asyncHandler(async (req) => {
  const data = await createUser(req.body);
  return data;
});

export const getUsersHandler = asyncHandler(async () => {
  const data = await getUsers();
  return data;
});

export const getUserbyIdHandler = asyncHandler(async (req) => {
  const data = await getUserById(req.params.id as string);
  return data;
});

export const updateUserHandler = asyncHandler(async (req) => {
  const data = await updateUser(req.params.id as string, req.body);
  return data;
});

export const deleteUserHandler = asyncHandler(async (req) => {
  const data = await deleteUser(req.params.id as string);
  return data;
});
