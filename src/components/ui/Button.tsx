'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  icon,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-3 font-semibold transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group';

  const variants = {
    primary: 'bg-gradient-to-r from-slate-gray to-sage-tan text-dark-olive shadow-lg hover:shadow-xl hover:shadow-sage-tan/30 hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-gradient-to-r from-charcoal-green to-slate-gray text-cream-light shadow-lg hover:shadow-xl hover:shadow-charcoal-green/30 hover:scale-[1.02] active:scale-[0.98]',
    outline: 'border-2 border-sage-tan text-cream-light hover:bg-sage-tan hover:text-dark-olive hover:border-sage-tan shadow-sm hover:shadow-md',
    ghost: 'text-cream-light hover:bg-sage-tan/20 hover:text-cream-light',
    glass: 'glass text-cream-light hover:bg-charcoal-green/80 shadow-md hover:shadow-lg',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm rounded-lg',
    md: 'px-7 py-3.5 text-base rounded-xl',
    lg: 'px-9 py-4 text-lg rounded-xl',
    xl: 'px-12 py-5 text-xl rounded-2xl',
  };

  return (
    <motion.button
      whileHover={{ scale: variant === 'outline' || variant === 'ghost' ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {/* Shimmer effect for primary buttons */}
      {(variant === 'primary' || variant === 'secondary') && (
        <span className="absolute inset-0 shimmer pointer-events-none" />
      )}

      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
