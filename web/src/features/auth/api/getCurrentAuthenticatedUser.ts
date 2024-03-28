export const getCurrentAuthenticatedUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/me`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};
