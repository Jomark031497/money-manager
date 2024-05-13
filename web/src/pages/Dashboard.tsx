import { Button } from '../components/ui/Button';
import { usePageTitle } from '../features/utils/hooks/usePageTitle';

const sampleData = [
  {
    name: 'jordan',
    rating: 4.5,
    numberOfClients: 3,
    description:
      'Jose Kielle is your go-to listener for whatever life throws your way. With a compassionate heart a commitment to confidentiality, Jose Kielle provides a safe space for you to vent, rant, seek  advice, or simply chat.',
  },
  {
    name: 'marcus',
    rating: 3,
    numberOfClients: 5,
    description:
      'Jose Kielle is your go-to listener for whatever life throws your way. With a compassionate heart a commitment to confidentiality, Jose Kielle provides a safe space for you to vent, rant, seek  advice, or simply chat.',
  },
  {
    name: 'alejo',
    rating: 5,
    numberOfClients: 5,
    description:
      'Jose Kielle is your go-to listener for whatever life throws your way. With a compassionate heart a commitment to confidentiality, Jose Kielle provides a safe space for you to vent, rant, seek  advice, or simply chat.',
  },
  {
    name: 'jose-kille',
    rating: 0,
    numberOfClients: 0,
    description:
      'Jose Kielle is your go-to listener for whatever life throws your way. With a compassionate heart a commitment to confidentiality, Jose Kielle provides a safe space for you to vent, rant, seek  advice, or simply chat.',
  },
];

export const Dashboard = () => {
  usePageTitle('home | hello.friend');

  return (
    <div className="p-4">
      <div>
        <p className="mb-4 text-2xl font-bold text-gray-500">recent friends</p>
        <ul className="grid grid-cols-3 gap-8">
          {sampleData.map((friend) => (
            <li key={friend.name} className="flex flex-col gap-2 rounded border p-2 shadow">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full border border-gray-500 bg-white shadow"></div>

                <p className="text-lg font-semibold">{friend.name}</p>
                <p className="font-semibold text-gray-500">{friend.rating}/5</p>
              </div>

              <p className="pl-4 text-sm text-gray-500">{friend.description}</p>

              <div className="mb-2 mt-4 flex items-center justify-between pl-4">
                <span className="text-lg font-semibold text-gray-500">{friend.numberOfClients} clients</span>
                <Button>View Profile</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
