'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 transition-all group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="p-4">
        <FaWhatsapp className="text-3xl" />
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="pr-5 font-medium whitespace-nowrap overflow-hidden"
          >
            Chat with us
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// For the animation to work properly, we need to import AnimatePresence
import { AnimatePresence } from 'framer-motion';
