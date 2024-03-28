import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={twMerge(
          "rounded bg-accent px-2 py-1.5 font-bold transition-all hover:bg-accent/80",
          props.className,
        )}
      >
        {children}
      </button>
    );
  },
);
