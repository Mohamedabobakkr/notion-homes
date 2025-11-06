'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  glass = false,
}) => {
  const baseStyles = 'rounded-xl overflow-hidden';
  const glassStyles = glass ? 'glass shadow-lg' : 'bg-white shadow-md';

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
        transition={{ duration: 0.3 }}
        className={`${baseStyles} ${glassStyles} ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseStyles} ${glassStyles} ${className}`}>
      {children}
    </div>
  );
};
