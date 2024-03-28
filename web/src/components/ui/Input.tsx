import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => {
  return (
    <label className="flex flex-col gap-1 text-sm font-semibold tracking-wide text-gray-500">
      {label}
      <input
        ref={ref}
        {...props}
        className="rounded border-2 p-2 text-text outline-none transition-all hover:border-accent/50 focus:border-accent"
      />
    </label>
  );
});
