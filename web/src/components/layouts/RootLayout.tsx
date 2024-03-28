import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="flex gap-4">
      <aside className="h-screen w-80 border-r shadow">allow</aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
