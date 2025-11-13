import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  labelClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', labelClassName = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className={`block text-sm font-medium mb-2 ${labelClassName || 'text-dark-olive'}`}>
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-800">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3
              ${icon ? 'pl-12' : ''}
              border border-sand-200 rounded-lg
              bg-white text-dark-olive
              placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-sage-tan focus:border-transparent
              transition-all duration-200
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
