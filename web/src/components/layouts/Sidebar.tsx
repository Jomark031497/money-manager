import { NavLink } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { Button } from '../ui/Button';
import { HiLogout } from 'react-icons/hi';
import { LuLayoutDashboard, LuUserCircle2 } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { MdOutlineNumbers } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';

const navLinks = [
  {
    label: 'dashboard',
    icon: <LuLayoutDashboard />,
    path: '/',
  },
  {
    label: 'profile',
    icon: <LuUserCircle2 />,
    path: '/profile',
  },
  {
    label: 'rooms',
    icon: <MdOutlineNumbers />,
    path: '/rooms',
  },
  {
    label: 'settings',
    icon: <IoSettingsOutline />,
    path: '/settings',
  },
];

export const Sidebar = () => {
  const { user, handleSignOut } = useAuth();

  return (
    <>
      <aside className="flex h-screen w-80 flex-col border-r shadow">
        <div className="flex h-16 items-center justify-center border-b">
          <p className="text-4xl tracking-wide">
            hello.<span className="font-bold text-secondary">friend</span>
          </p>
        </div>
        <ul className="flex flex-1 flex-col gap-2 p-4">
          {navLinks.map((navLink) => (
            <NavLink
              key={navLink.label}
              to={navLink.path}
              className={({ isActive }) =>
                twMerge(
                  'flex items-center gap-2 rounded p-2 text-lg font-semibold text-gray-500 transition-all hover:bg-secondary/30',
                  isActive && 'bg-secondary/20 text-secondary',
                )
              }
            >
              {navLink.icon}
              {navLink.label}
            </NavLink>
          ))}
        </ul>
        <div className="flex h-16 items-center border-t p-4">
          <div className="flex-1">
            <p className="text-sm">{user?.fullName ?? user?.id}</p>
            <p className="text-sm">{user?.email}</p>
          </div>

          <Button onClick={handleSignOut} className="rounded border-secondary bg-transparent px-1 py-2 shadow">
            <HiLogout />
          </Button>
        </div>
      </aside>
    </>
  );
};
