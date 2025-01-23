import React from 'react';
import { cn } from '../../utils/cn';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  helpText?: string;
}

export function FormInput({ 
  label, 
  icon, 
  helpText,
  className = '', 
  ...props 
}: FormInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={cn(
            "block w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500",
            icon ? "pl-10 pr-3" : "px-3",
            "py-2",
            className
          )}
        />
      </div>
      {helpText && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
}