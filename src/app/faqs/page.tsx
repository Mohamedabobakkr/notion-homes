'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { getAllFAQs } from '@/lib/sanity-queries';
import { FAQ, FAQCategory } from '@/types';
import FAQSection from '@/components/features/FAQSection';
import { contactInfo } from '@/data/contact';

const categoryLabels: Record<FAQCategory, string> = {
  general: 'General Questions',
  buying: 'Buying Property',
  renting: 'Renting Property',
  selling: 'Selling Property',
  financing: 'Financing & Payment',
  legal: 'Legal & Documentation',
};

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFAQs() {
      setLoading(true);
      const data = await getAllFAQs();
      setFaqs(data);
      setLoading(false);
    }
    fetchFAQs();
  }, []);

  // Group FAQs by category
  const faqsByCategory = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<FAQCategory, FAQ[]>);

  // Define category order
  const categoryOrder: FAQCategory[] = ['general', 'buying', 'renting', 'selling', 'financing', 'legal'];

  if (loading) {
    return (
      <main className="pt-32 pb-20 bg-dark-olive">
        <Container>
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream-light mb-6">
              Frequently Asked <span className="text-cream-light">Questions</span>
            </h1>
            <p className="text-cream-light text-lg md:text-xl max-w-3xl mx-auto">
              Loading FAQs...
            </p>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 bg-dark-olive">
      <Container>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12 text-center px-4"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-cream-light mb-4 md:mb-6">
            Frequently Asked <span className="text-cream-light">Questions</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-cream-light max-w-3xl mx-auto">
            Find answers to common questions about buying, renting, and selling luxury properties with Notion Homes.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 px-4">
          {categoryOrder.map((category) => {
            const categoryFAQs = faqsByCategory[category];

            if (!categoryFAQs || categoryFAQs.length === 0) {
              return null;
            }

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-cream-light mb-4 md:mb-6">
                  {categoryLabels[category]}
                </h2>
                <FAQSection faqs={categoryFAQs} />
              </motion.div>
            );
          })}

          {faqs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-cream-light mb-4">
                No FAQs available at the moment. Please check back later.
              </p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 md:mt-16 text-center px-4"
        >
          <div className="bg-charcoal-green rounded-xl shadow-lg p-6 md:p-8 lg:p-12 max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-cream-light mb-3 md:mb-4">
              Still have questions?
            </h2>
            <p className="text-cream-light text-base md:text-lg mb-6">
              Our team is here to help. Get in touch with us for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 rounded-lg font-medium transition-all"
                style={{
                  backgroundColor: '#DBC086',
                  color: '#0A3B28',
                }}
              >
                Contact Us
              </a>
              <a
                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg font-medium transition-all"
                style={{
                  backgroundColor: '#DBC086',
                  color: '#0A3B28',
                }}
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}
