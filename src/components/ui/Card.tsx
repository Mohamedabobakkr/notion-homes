'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  variant?: 'default' | 'elevated' | 'bordered' | 'neumorphic';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  glass = false,
  variant = 'default',
}) => {
  const baseStyles = 'rounded-2xl overflow-hidden transition-all duration-300';

  const variants = {
    default: glass ? 'glass shadow-md' : 'bg-surface shadow-md hover:shadow-xl',
    elevated: 'bg-surface shadow-xl hover:shadow-2xl',
    bordered: 'bg-surface border-2 border-cream-dark hover:border-teal-primary/30',
    neumorphic: 'neumorphic',
  };

  if (hover) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{
          y: -12,
          transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
        }}
        className={`${baseStyles} ${variants[variant]} ${className} group`}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
};
