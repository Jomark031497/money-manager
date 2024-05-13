import { InputHTMLAttributes } from 'react';

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'> {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const Switch = ({ label, checked, onChange, ...rest }: SwitchProps) => {
  return (
    <div className="flex items-center">
      <label htmlFor="toggle" className="flex cursor-pointer items-center">
        <div className="relative">
          <input
            id="toggle"
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={onChange}
            aria-label={label}
          />
          <div className="block h-8 w-14 rounded-full bg-gray-600"></div>
          <div
            className={`${
              checked ? 'bg-blue-500' : 'bg-white'
            } absolute left-0 top-0 h-8 w-8 transform rounded-full transition-transform duration-300`}
          ></div>
        </div>
        <div className="ml-3 font-medium text-gray-700">{label}</div>
      </label>
    </div>
  );
};
