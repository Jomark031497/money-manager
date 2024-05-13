import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const RootLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <div className="h-16" />
        <Outlet />
      </main>
    </div>
  );
};
