import { LoginInputsType, UserType } from '../auth.schema';

export const loginUser = async (payload: LoginInputsType): Promise<UserType> => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};
