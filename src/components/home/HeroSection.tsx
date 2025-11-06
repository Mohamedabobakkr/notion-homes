'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-dark via-teal-primary to-teal-accent" />

        {/* Animated Circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-accent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-sage rounded-full blur-3xl"
        />

        {/* Floating Shapes */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border-4 border-white/20 rounded-3xl rotate-12"
          animate={{ y: [-20, 20, -20], rotate: [12, 22, 12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 border-4 border-white/20 rounded-full"
          animate={{ y: [20, -20, 20], x: [-10, 10, -10] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal-dark/20 via-transparent to-teal-dark/40" />
      </div>

      {/* Content */}
      <Container className="relative z-10 py-32">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8 text-white"
            >
              <span className="w-2 h-2 bg-sage rounded-full animate-pulse" />
              <span className="text-sm font-semibold tracking-wider">Trusted UK-Egypt Property Bridge</span>
            </motion.div>

            {/* Main Heading with Gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 leading-[1.1]"
            >
              Discover Your
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 bg-gradient-to-r from-cream-mint via-sage-light to-cream-light bg-clip-text text-transparent">
                  Egyptian Dream
                </span>
                <motion.div
                  className="absolute -inset-2 bg-white/20 blur-2xl rounded-full"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              Luxury properties across Hurghada, El Gouna, North Coast & Cairo.
              <span className="block mt-2 text-cream-mint font-medium">Your gateway to Mediterranean living.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/properties">
                <Button size="xl" variant="primary" icon={<FaSearch className="text-xl" />}>
                  Explore Properties
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="xl" variant="glass" className="!text-white !border-white/30 hover:!bg-white/20">
                  Book Consultation
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-20 pt-12 border-t border-white/20"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {[
                  { value: '500+', label: 'Properties Sold' },
                  { value: '1000+', label: 'Happy Clients' },
                  { value: '15+', label: 'Years Excellence' },
                  { value: '4', label: 'Prime Locations' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="text-4xl md:text-5xl font-extrabold text-cream-mint mb-2 tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-white/80 text-sm md:text-base font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-8 h-12 border-2 border-white/40 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1.5 h-2.5 bg-cream-mint rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
