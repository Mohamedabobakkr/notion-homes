'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-xl py-4'
          : 'bg-white/95 backdrop-blur-sm py-6 shadow-md'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col"
            >
              <span className="text-2xl md:text-3xl font-extrabold text-teal-dark font-heading">
                Notion Homes
              </span>
              <span className="text-xs text-teal-primary tracking-widest uppercase font-semibold">
                Luxury Egyptian Properties
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-semibold transition-colors relative group ${
                  pathname === link.href
                    ? 'text-teal-primary'
                    : 'text-teal-dark hover:text-teal-primary'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-teal-primary transition-all ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+442012345678"
              className="text-teal-primary hover:text-teal-accent transition-colors"
            >
              <FaPhone className="text-xl" />
            </a>
            <Link href="/contact">
              <Button size="sm" variant="primary">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-teal-dark text-2xl focus:outline-none hover:text-teal-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block text-lg font-semibold transition-colors ${
                      pathname === link.href
                        ? 'text-teal-primary'
                        : 'text-teal-dark hover:text-teal-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 space-y-3">
                  <a
                    href="tel:+442012345678"
                    className="flex items-center gap-2 text-teal-dark hover:text-teal-primary transition-colors font-semibold"
                  >
                    <FaPhone /> Call Us
                  </a>
                  <Link href="/contact">
                    <Button fullWidth variant="primary">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </nav>
  );
};
