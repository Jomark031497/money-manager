import { usePageTitle } from '../features/utils/hooks/usePageTitle';
import { useState } from 'react';
import { Chatbox } from '../features/messaging/components/Chatbox';

export const Dashboard = () => {
  usePageTitle('home | hello.friend');

  const [messages] = useState([
    {
      id: '1',
      date: new Date(),
      userId: '_5MMlP4cD5RhvNcp8RPpO',
      body: 'edi wow pekpek',
    },
    {
      id: '2',
      date: new Date(),
      userId: 'Anonymous',
      body: 'edi wow pokpok',
    },
    {
      id: '3',
      date: new Date(),
      userId: 'Anonymous',
      body: 'buguk mu',
    },
  ]);

  return (
    <div className="py-4">
      <Chatbox messages={messages} />
    </div>
  );
};
