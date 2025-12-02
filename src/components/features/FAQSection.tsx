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
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`border rounded-xl overflow-hidden transition-all duration-300 ${openId === faq.id
            ? 'bg-white border-dark-olive/20 shadow-md'
            : 'bg-white border-dark-olive/10 hover:border-dark-olive/20'
            }`}
        >
          <button
            onClick={() => toggleFAQ(faq.id)}
            className="w-full px-6 py-4 flex items-center justify-between text-left group"
            aria-expanded={openId === faq.id}
          >
            <span className={`text-base md:text-lg font-medium pr-8 transition-colors duration-300 text-dark-olive font-heading`}>
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openId === faq.id ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`flex-shrink-0 ${openId === faq.id ? 'text-dark-olive' : 'text-dark-olive/50'}`}
            >
              <FaChevronDown className="text-base" />
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
                <div className="px-6 pb-5 pt-2 text-dark-olive/70 leading-relaxed whitespace-pre-line text-sm md:text-base">
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
