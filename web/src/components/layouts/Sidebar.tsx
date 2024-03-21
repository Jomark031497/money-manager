import { MdOutlineDashboard, MdOutlineLogout } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { LuWalletCards } from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const NavItems = [
  {
    label: "Dashboard",
    icon: <MdOutlineDashboard />,
    path: "/",
  },
  {
    label: "Profile",
    icon: <FaRegUser />,
    path: "/profile",
  },
  {
    label: "Wallets",
    icon: <LuWalletCards />,
    path: "/wallets",
  },
  {
    label: "Transactions",
    icon: <GrTransaction />,
    path: "/transactions",
  },
];

export const Sidebar = () => {
  return (
    <aside className="flex h-screen w-72 flex-col border-r">
      <div className="flex items-center justify-center border-b p-4">
        <h1 className="text-2xl font-semibold text-gray-500">Money Manager</h1>
      </div>

      <ul className="flex flex-1 flex-col gap-1 p-4">
        {NavItems.map((item) => (
          <ListItem key={item.label} item={item} />
        ))}
      </ul>

      <div className="flex items-center gap-2 border-t p-4">
        <div className="flex-1">
          <p>Solaire of Astora</p>
          <p className="text-sm text-gray-500">solaire.astora@darksouls.com</p>
        </div>
        <button className="rotate-180 rounded border text-2xl">
          <MdOutlineLogout />
        </button>
      </div>
    </aside>
  );
};

interface ListItemProps {
  item: {
    icon: ReactNode;
    label: string;
    path: string;
  };
}

const ListItem = ({ item }: ListItemProps) => {
  return (
    <li>
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          twMerge(
            "flex items-center gap-2 rounded p-2 font-semibold text-gray-500 transition-all hover:bg-gray-200",
            isActive ? "bg-gray-200 text-black" : "bg-inherit",
          )
        }
      >
        <i className="text-2xl">{item.icon}</i>
        <span>{item.label}</span>
      </NavLink>
    </li>
  );
};
