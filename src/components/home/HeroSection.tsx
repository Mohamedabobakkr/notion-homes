'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-overlay">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800">
        {/* You would add your actual background image here */}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 via-navy-900/70 to-navy-950/90" />

      {/* Content */}
      <Container className="relative z-10 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gold-400 text-lg md:text-xl mb-6 tracking-wider uppercase font-medium"
          >
            Your Bridge to Luxury Egyptian Living
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
          >
            Discover Your Dream
            <br />
            <span className="text-gold-400">Egyptian Paradise</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-sand-100 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Premier UK-based property company specializing in luxury vacation homes
            and investment properties across Hurghada, El Gouna, North Coast, and Cairo.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/properties">
              <Button size="lg" variant="primary" icon={<FaSearch />}>
                Browse Properties
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-navy-900">
                Schedule Consultation
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 pt-8 border-t border-white/20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">
                  500+
                </div>
                <div className="text-sand-200 text-sm md:text-base">
                  Properties Sold
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">
                  1000+
                </div>
                <div className="text-sand-200 text-sm md:text-base">
                  Happy Clients
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">
                  15+
                </div>
                <div className="text-sand-200 text-sm md:text-base">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">
                  4
                </div>
                <div className="text-sand-200 text-sm md:text-base">
                  Prime Locations
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-gold-400 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-gold-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
