import { Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Button } from '../ui/Button';

export const RootLayout = () => {
  const { user, handleSignOut } = useAuth();

  return (
    <div className="flex gap-4">
      <aside className="flex h-screen w-80 flex-col border-r shadow">
        <div>Nav</div>
        <ul className="flex-1">List</ul>
        <div className="border-t-2">
          <p>{user?.email}</p>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
