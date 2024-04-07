import { GiUnfriendlyFire } from 'react-icons/gi';
import { MessageType } from '../chat.schema';
import { Message } from './Message';
import { DynamicTextArea } from '../../../components/ui/DynamicTextArea';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { LuSend } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { socket } from '../../../lib/socket';

interface ChatboxProps {
  messages: MessageType[];
}

interface Message {
  content: string;
}

export const Chatbox = ({ messages }: ChatboxProps) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  useEffect(() => {
    const chatMessage = (msg: Message) => {
      setChatHistory([...chatHistory, msg]);
    };
    socket.on('chat_message', chatMessage);

    return () => {
      socket.off('chat_message', chatMessage);
    };
  });

  const sendMessage = () => {
    if (message) {
      socket.emit('chat_message', { content: message });
      setMessage('');
    }
  };

  return (
    <>
      <div className="grid max-w-4xl grid-cols-6 gap-2 rounded border p-4 shadow">
        <ul className="col-span-4 flex min-h-96 flex-col gap-4 rounded border p-4 shadow">
          {messages.map((message) => (
            <li key={message.id}>
              <Message date={message.date} message={message.body} userId={message.userId} />
            </li>
          ))}
        </ul>
        <div className="col-span-2 rounded border p-4 shadow">
          <p className="text-lg font-semibold"># room_shambles</p>

          <ul className="flex flex-col gap-1">
            {[
              { username: 'retrorded' },
              { username: 'hb rics' },
              { username: 'hook_roque' },
              { username: 'dfe.darkside' },
              { username: 'pain' },
              { username: 'alus5on' },
              { username: 'astigonly' },
              { username: 'thinkagainbro' },
              { username: 'meryll' },
              { username: 'hb lack' },
            ].map((item) => (
              <li key={item.username} className="flex items-center gap-2 text-gray-500">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border font-semibold text-accent shadow">
                  <GiUnfriendlyFire />
                </div>
                {item.username}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-6 flex items-center gap-2 rounded border p-4 shadow">
          <DynamicTextArea rows={1} />

          <button className="rounded border p-2 text-2xl text-accent shadow">
            <MdOutlineEmojiEmotions />
          </button>

          <button className="rounded border p-2 text-2xl text-accent shadow">
            <LuSend />
          </button>
        </div>
      </div>
    </>
  );
};
