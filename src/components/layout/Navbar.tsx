'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
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
          ? 'bg-cream-light shadow-md py-4'
          : 'bg-cream-bg py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {/* Logo Icon */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 md:w-12 md:h-12"
            >
              {/* House outline */}
              <path
                d="M15 45L50 15L85 45V85H15V45Z"
                stroke="#8B7355"
                strokeWidth="3"
                fill="none"
              />
              {/* NH Text */}
              <text
                x="50"
                y="68"
                fontFamily="Playfair Display, serif"
                fontSize="32"
                fontWeight="600"
                fill="#8B7355"
                textAnchor="middle"
              >
                NH
              </text>
            </svg>

            {/* Brand Text */}
            <div className="text-2xl md:text-3xl font-heading font-semibold" style={{ color: '#8B7355' }}>
              NOTION HOMES
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-text-primary font-semibold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Locations */}
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary border-l border-border-light pl-6">
              <FaMapMarkerAlt className="text-olive-green" />
              <span>Egypt • London</span>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button size="md" variant="filled">
                Book a Tour
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-text-primary text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pt-6 pb-4 space-y-4 border-t border-border-light mt-4 animate-in slide-in-from-top duration-300">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-base font-medium transition-all hover:translate-x-2 ${
                  pathname === link.href
                    ? 'text-text-primary font-semibold'
                    : 'text-text-secondary'
                }`}
                style={{
                  animation: `slideDown 0.3s ease-out ${index * 0.05}s both`
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Locations - Mobile */}
            <div className="flex items-center gap-2 text-sm font-medium text-text-secondary pt-2 border-t border-border-light" style={{
              animation: `slideDown 0.3s ease-out ${navLinks.length * 0.05}s both`
            }}>
              <FaMapMarkerAlt className="text-olive-green" />
              <span>Egypt • London</span>
            </div>

            <div className="pt-4" style={{
              animation: `slideDown 0.3s ease-out ${(navLinks.length + 1) * 0.05}s both`
            }}>
              <Link href="/contact">
                <Button fullWidth variant="filled">
                  Book a Tour
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
};
