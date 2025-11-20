'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { FAQ } from '@/types';

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`border rounded-lg overflow-hidden transition-all duration-300 ${openId === faq.id
            ? 'bg-charcoal-green border-sage-tan/50 shadow-lg'
            : 'bg-charcoal-green/30 border-sage-tan/20 hover:border-sage-tan/40'
            }`}
        >
          <button
            onClick={() => toggleFAQ(faq.id)}
            className="w-full px-6 py-5 flex items-center justify-between text-left group"
            aria-expanded={openId === faq.id}
          >
            <span className={`text-lg font-medium pr-8 transition-colors duration-300 ${openId === faq.id ? 'text-sage-tan' : 'text-dark-olive group-hover:text-sage-tan'
              }`}>
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openId === faq.id ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`flex-shrink-0 ${openId === faq.id ? 'text-sage-tan' : 'text-sage-tan/70'}`}
            >
              <FaChevronDown className="text-xl" />
            </motion.div>
          </button>

          <AnimatePresence>
            {openId === faq.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 pb-6 pt-2 text-cream-light/90 leading-relaxed whitespace-pre-line border-t border-sage-tan/10 mx-6 mt-2">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
