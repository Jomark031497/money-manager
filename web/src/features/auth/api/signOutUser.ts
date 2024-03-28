export const signOutUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/sign-out`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data);

  return data;
};
