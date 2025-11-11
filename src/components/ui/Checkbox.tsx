import React from 'react';
import { motion } from 'framer-motion';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      {/* Custom Checkbox */}
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <motion.div
          className="w-5 h-5 rounded-md border-2 transition-all duration-300"
          style={{
            backgroundColor: checked ? '#C8B898' : 'transparent',
            borderColor: checked ? '#C8B898' : '#C8B898',
            boxShadow: checked ? '0 10px 15px -3px rgba(200, 184, 152, 0.3)' : 'none'
          }}
          whileHover={{
            scale: 1.1,
            borderColor: '#C8B898'
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Checkmark */}
          <motion.svg
            className="w-full h-full"
            style={{ color: '#2C3D2F' }}
            viewBox="0 0 24 24"
            fill="none"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: checked ? 1 : 0,
              pathLength: checked ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            <motion.path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </div>

      {/* Label */}
      <span
        className="text-sm font-medium transition-colors duration-200"
        style={{
          color: checked ? '#2C3D2F' : '#2C3D2F'
        }}
      >
        {label}
      </span>
    </label>
  );
};
