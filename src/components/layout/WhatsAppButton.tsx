'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { contactInfo } from '@/data/contact';

interface WhatsAppButtonProps {
  propertyId?: string;
  propertyTitle?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  propertyId,
  propertyTitle,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    let message = 'Hello! I\'m interested in learning more about your properties.';

    if (propertyTitle) {
      message = `Hello! I'm interested in the property: ${propertyTitle}`;
      if (propertyId) {
        message += ` (ID: ${propertyId})`;
      }
    }

    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-2xl hover:shadow-green-500/50 transition-all group overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
    >
      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 bg-green-400 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative p-4 z-10">
        <FaWhatsapp className="text-3xl" />
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="pr-6 font-bold whitespace-nowrap overflow-hidden relative z-10"
          >
            Chat with us
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
