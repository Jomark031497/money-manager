import { format } from 'date-fns';
import { GiUnfriendlyFire } from 'react-icons/gi';
import { useAuth } from '../../auth/hooks/useAuth';
import { twMerge } from 'tailwind-merge';

interface MessageProps {
  message: string;
  userId: string;
  date: Date;
}

export const Message = ({ date, message, userId }: MessageProps) => {
  const { user } = useAuth();

  const shouldChatBeCustom = user?.id === userId;

  return (
    <>
      <div className="flex gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border text-3xl font-semibold text-accent shadow">
          <GiUnfriendlyFire />
        </div>

        <div className={twMerge('rounded p-2', shouldChatBeCustom && 'w-full bg-secondary/10 shadow')}>
          <p className="font-semibold text-gray-500">
            {shouldChatBeCustom ? 'You' : userId}{' '}
            <span className="text-sm font-normal">{format(date, 'dd/MM/yyyy hh:mm a')}</span>
          </p>
          <span>{message}</span>
        </div>
      </div>
    </>
  );
};
