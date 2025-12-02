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
  // Static FAQs data
  const staticFaqs: FAQ[] = [
    // Buying Property
    {
      id: '1',
      question: 'Can foreigners buy property in Egypt?',
      answer: 'Yes, foreigners can buy property in Egypt. There are two main types of registration: Signature Validity (Sahha Tawqia) and Green Contract (Musajjal). Most properties in tourist areas like El Gouna and Hurghada are sold with Signature Validity, which is a legal court verdict proving ownership. We guide you through the entire legal process.',
      category: 'buying',
      order: 1,
      isPublished: true
    },
    {
      id: '2',
      question: 'What are the additional costs when buying a property?',
      answer: 'Besides the property price, you should budget for:\n• Legal fees (approx. 1.5% - 2.5%)\n• Maintenance fees (usually a one-time deposit or annual fee depending on the project)\n• Utility connection fees (electricity and water meters)\n• Furniture packages (if not included)',
      category: 'buying',
      order: 2,
      isPublished: true
    },
    {
      id: '3',
      question: 'Do you offer virtual viewings?',
      answer: 'Absolutely. We understand many of our clients are overseas. We offer comprehensive virtual tours via video call (WhatsApp, Zoom, FaceTime) where we walk you through the property and the surrounding area in real-time.',
      category: 'buying',
      order: 3,
      isPublished: true
    },

    // Renting Property
    {
      id: '4',
      question: 'How does the rental management service work?',
      answer: 'We offer a full turnkey rental management service. We handle marketing, guest check-in/out, cleaning, maintenance, and payment processing. You receive a detailed monthly statement and your rental income directly to your bank account.',
      category: 'renting',
      order: 1,
      isPublished: true
    },
    {
      id: '5',
      question: 'What is the expected ROI for rental properties?',
      answer: 'Rental yields in Red Sea resort areas typically range from 6% to 10% annually, depending on the location, property type, and furnishing standard. Short-term holiday rentals often generate higher returns than long-term lets.',
      category: 'renting',
      order: 2,
      isPublished: true
    },

    // General
    {
      id: '6',
      question: 'Why should I invest in El Gouna or Hurghada?',
      answer: 'The Red Sea coast offers year-round sunshine, world-class diving, and a growing expat community. Property prices are competitive compared to Europe, and the cost of living is low. Infrastructure improvements and new international flight routes are constantly increasing the region\'s accessibility and value.',
      category: 'general',
      order: 1,
      isPublished: true
    },
    {
      id: '7',
      question: 'Is it safe to live in Egypt?',
      answer: 'Yes, areas like El Gouna, Hurghada, and Somabay are extremely safe gated communities or tourist-focused cities with 24/7 security. They are very popular with European expats and families.',
      category: 'general',
      order: 2,
      isPublished: true
    },

    // Financing
    {
      id: '8',
      question: 'Are payment plans available?',
      answer: 'Yes, many off-plan developments offer interest-free payment plans ranging from 3 to 7 years. Resale properties are typically cash payments, but some owners may accept short-term installments.',
      category: 'financing',
      order: 1,
      isPublished: true
    },
    {
      id: '9',
      question: 'Can I open a bank account in Egypt?',
      answer: 'Yes, foreigners can open bank accounts in Egypt. You will typically need your passport and a valid visa. Some banks may require a minimum deposit or proof of address in your home country.',
      category: 'financing',
      order: 2,
      isPublished: true
    }
  ];

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFAQs() {
      setLoading(true);
      try {
        const data = await getAllFAQs();
        if (data && data.length > 0) {
          setFaqs(data);
        } else {
          // Fallback to static data if no data from Sanity
          setFaqs(staticFaqs);
        }
      } catch (error) {
        console.error("Failed to fetch FAQs, using static data", error);
        setFaqs(staticFaqs);
      } finally {
        setLoading(false);
      }
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
  const categoryOrder: FAQCategory[] = ['general', 'buying', 'renting', 'financing', 'legal', 'selling'];

  if (loading) {
    return (
      <main className="pt-32 pb-20 bg-cream-light min-h-screen">
        <Container>
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-olive mb-6 font-heading">
              Frequently Asked Questions
            </h1>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-dark-olive border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 bg-cream-light min-h-screen">
      <Container>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-olive mb-6 font-heading">
            Frequently Asked Questions
          </h1>
          <p className="text-base md:text-lg text-dark-olive/70 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about buying, renting, and living in Egypt's premier destinations.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="max-w-3xl mx-auto space-y-16 px-4">
          {categoryOrder.map((category) => {
            const categoryFAQs = faqsByCategory[category];

            if (!categoryFAQs || categoryFAQs.length === 0) {
              return null;
            }

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-dark-olive font-heading">
                    {categoryLabels[category]}
                  </h2>
                </div>
                <FAQSection faqs={categoryFAQs} />
              </motion.div>
            );
          })}

          {faqs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-dark-olive mb-4">
                No FAQs available at the moment. Please check back later.
              </p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20 text-center px-4"
        >
          <div className="bg-white border border-dark-olive/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-olive mb-4 font-heading">
              Still have questions?
            </h2>
            <p className="text-dark-olive/70 text-lg mb-8 max-w-2xl mx-auto">
              We're here to help you navigate your real estate journey. Reach out to our team for personalized support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl"
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
                className="px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-xl"
                style={{
                  backgroundColor: '#0A3B28',
                  color: '#FFFFFF',
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
