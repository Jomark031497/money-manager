import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const RootLayout = () => {
  return (
    <div className="flex gap-4">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
