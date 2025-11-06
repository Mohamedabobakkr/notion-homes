import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { contactInfo } from '@/data/contact';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-green text-cream-light">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-cream-light font-heading">
                Notion Homes
              </h3>
              <p className="text-cream-light/90 mb-6 leading-relaxed">
                Your trusted bridge between UK and Egyptian real estate. Specializing in luxury properties across Egypt's most sought-after destinations.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-gray hover:bg-slate-gray-light text-cream-light flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-gray hover:bg-slate-gray-light text-cream-light flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-gray hover:bg-slate-gray-light text-cream-light flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-gray hover:bg-slate-gray-light text-cream-light flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-cream-light font-heading">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/properties" className="text-cream-light/80 hover:text-sage-tan transition-colors">
                    Browse Properties
                  </Link>
                </li>
                <li>
                  <Link href="/properties?status=for-sale" className="text-cream-light/80 hover:text-sage-tan transition-colors">
                    Properties for Sale
                  </Link>
                </li>
                <li>
                  <Link href="/properties?status=for-rent" className="text-cream-light/80 hover:text-sage-tan transition-colors">
                    Properties for Rent
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-cream-light/80 hover:text-sage-tan transition-colors">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-cream-light/80 hover:text-sage-tan transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-cream-light/80 hover:text-sage-tan transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-cream-light font-heading">Our Locations</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/properties?location=hurghada" className="text-cream-light/80 hover:text-sage-tan transition-colors">
                    Hurghada Properties
                  </Link>
                </li>
                <li>
                  <Link href="/properties?location=al-gouna" className="text-cream-light/80 hover:text-sage-tan transition-colors">
                    El Gouna Properties
                  </Link>
                </li>
                <li>
                  <Link href="/properties?location=north-coast" className="text-cream-light/80 hover:text-sage-tan transition-colors">
                    North Coast Properties
                  </Link>
                </li>
                <li>
                  <Link href="/properties?location=cairo" className="text-cream-light/80 hover:text-sage-tan transition-colors">
                    Cairo Properties
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-cream-light font-heading">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaPhone className="text-sage-tan mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-cream-light/80">UK: {contactInfo.phone.uk}</p>
                    <p className="text-cream-light/80">Egypt: {contactInfo.phone.egypt}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaEnvelope className="text-sage-tan mt-1 flex-shrink-0" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-cream-light/80 hover:text-sage-tan transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-sage-tan mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-cream-light/80 text-sm">{contactInfo.address.uk}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sage-tan/30 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream-light/70">
            <p>© {currentYear} Notion Homes. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-sage-tan transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-sage-tan transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
