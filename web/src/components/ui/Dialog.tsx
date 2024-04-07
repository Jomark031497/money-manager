import { DialogHTMLAttributes, ReactNode, useLayoutEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';

interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
  children: ReactNode;
  onClose: () => void;
}

export const Dialog = ({ open, children, onClose, ...rest }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} onClose={onClose} {...rest} className="min-w-[300px] rounded border p-4 shadow-xl">
      <button
        onClick={onClose}
        className="absolute right-2 top-2 rounded-full border p-1 text-gray-500 transition-all hover:text-black"
      >
        <IoMdClose />
      </button>
      {children}
    </dialog>
  );
};
