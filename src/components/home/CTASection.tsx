'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { contactInfo } from '@/data/contact';

export const CTASection: React.FC = () => {
  return (
    <section className="section-padding-lg bg-gradient-to-br from-dark-olive via-charcoal-green to-slate-gray text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage-tan rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sage-tan rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream-light mb-6">
            Ready to Find Your
            <span className="text-cream-light"> Dream Property</span>?
          </h2>
          <p className="text-cream-light text-lg md:text-xl mb-12 leading-relaxed">
            Our expert team is here to guide you through every step of your Egyptian
            property journey. From viewing to purchase, we make it seamless.
          </p>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.a
              href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="bg-slate-gray hover:bg-charcoal-green p-6 rounded-xl flex flex-col items-center gap-3 transition-colors text-cream-light"
            >
              <FaWhatsapp className="text-4xl" />
              <span className="font-medium">WhatsApp Us</span>
            </motion.a>

            <motion.a
              href={`tel:${contactInfo.phone.uk.replace(/\s/g, '')}`}
              whileHover={{ scale: 1.05 }}
              className="bg-sage-tan hover:bg-sage-tan-dark p-6 rounded-xl flex flex-col items-center gap-3 transition-colors text-dark-olive"
            >
              <FaPhone className="text-4xl" />
              <span className="font-medium">Call Us Now</span>
            </motion.a>

            <motion.a
              href={`mailto:${contactInfo.email}`}
              whileHover={{ scale: 1.05 }}
              className="bg-charcoal-green hover:bg-slate-gray p-6 rounded-xl flex flex-col items-center gap-3 transition-colors text-cream-light"
            >
              <FaEnvelope className="text-4xl" />
              <span className="font-medium">Email Us</span>
            </motion.a>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/properties">
              <Button size="lg" variant="primary">
                Browse All Properties
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="!border-sage-tan !text-sage-tan hover:!bg-sage-tan hover:!text-dark-olive">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
