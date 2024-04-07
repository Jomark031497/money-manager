import { twMerge } from 'tailwind-merge';
import { Button } from '../components/ui/Button';
import { Dialog } from '../components/ui/Dialog';
import { useState } from 'react';

const sampleRooms = [
  {
    id: 1,
    name: 'First Room',
    numberOfUser: 100,
    isPublic: false,
  },
  {
    id: 2,
    name: 'Second Room',
    numberOfUser: 10,
    isPublic: true,
  },
  {
    id: 3,
    name: 'Third Room',
    numberOfUser: 50,
    isPublic: false,
  },
  {
    id: 4,
    name: 'Fourth Room',
    numberOfUser: 30,
    isPublic: true,
  },
];

export const Rooms = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div>
        <h1 className="mb-4 text-4xl font-semibold">Room List</h1>

        <Button onClick={() => setOpenDialog(true)}>Create Room</Button>

        <ul className="grid grid-cols-3 gap-2 p-4">
          {sampleRooms.map((room) => (
            <li className="col-span-1 flex flex-col rounded border p-4 shadow">
              <span className="text-xl"># {room.name}</span>
              <span className="text-lg">{room.numberOfUser} users</span>
              <span className={twMerge('', `${room.isPublic ? 'text-green-500' : 'text-red-500'}`)}>
                {room.isPublic ? 'Public' : 'Private'}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        Chewbacca
      </Dialog>
    </>
  );
};
