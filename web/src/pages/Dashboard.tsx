import { useState } from "react";
import { TiPlusOutline } from "react-icons/ti";
import { formatToCurrency } from "../utils/formatToCurrency";

export const Dashboard = () => {
  const [wallets] = useState([
    {
      name: "Unionbank Platinum Mastercard",
      type: "Credit Card",
      totalBalance: 160_000,
    },
    {
      name: "RCBC Hexagon Debit Card",
      type: "Debit Card",
      totalBalance: 10_000,
    },
  ]);

  return (
    <div className="p-4">
      {/* Offset the Navbar */}
      <div className="h-[64px]" />

      <div className="max-w-xl">
        <div className="flex items-center justify-between py-4">
          <p className="text-xl font-semibold text-gray-500">Wallets</p>
          <button className="flex items-center gap-2 rounded border-2 px-2 text-lg font-semibold text-gray-500 transition-all hover:border-black hover:text-black">
            Create Wallet
            <TiPlusOutline className="text-2xl" />
          </button>
        </div>
        <ul className="flex flex-col gap-2">
          {wallets.map((wallet) => (
            <li
              key={wallet.name}
              className="flex justify-between rounded border p-2"
            >
              <p>
                {wallet.name}{" "}
                <span className="text-xs text-gray-500">[{wallet.type}]</span>
              </p>

              <div>
                <p className="text-end text-sm text-gray-500">Balance</p>
                <p>{formatToCurrency(wallet.totalBalance)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
