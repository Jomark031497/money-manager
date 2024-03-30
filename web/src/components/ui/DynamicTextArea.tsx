import { TextareaHTMLAttributes, forwardRef } from 'react';

interface DynamicTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const DynamicTextArea = forwardRef<HTMLTextAreaElement, DynamicTextAreaProps>(({ ...props }, ref) => {
  const autoResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = 'auto'; // Reset the height to auto
    textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to match the scrollHeight
  };

  return (
    <textarea
      ref={ref}
      {...props}
      onInput={autoResize}
      className="max-h-20 min-h-10 w-full resize-none rounded border-2 px-2 py-2 text-sm tracking-wide text-text shadow outline-none hover:border-secondary focus:border-secondary"
    />
  );
});
