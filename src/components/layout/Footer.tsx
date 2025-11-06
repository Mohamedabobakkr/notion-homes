import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { contactInfo } from '@/data/contact';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gold-400 font-heading">
                Notion Homes
              </h3>
              <p className="text-sand-100 mb-6 leading-relaxed">
                Your trusted bridge between UK and Egyptian real estate. Specializing in luxury properties across Egypt's most sought-after destinations.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-500 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-500 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-500 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-500 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-gold-400">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/properties" className="text-sand-100 hover:text-gold-400 transition-colors">
                    Browse Properties
                  </Link>
                </li>
                <li>
                  <Link href="/properties?status=for-sale" className="text-sand-100 hover:text-gold-400 transition-colors">
                    Properties for Sale
                  </Link>
                </li>
                <li>
                  <Link href="/properties?status=for-rent" className="text-sand-100 hover:text-gold-400 transition-colors">
                    Properties for Rent
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sand-100 hover:text-gold-400 transition-colors">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sand-100 hover:text-gold-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sand-100 hover:text-gold-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-gold-400">Our Locations</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/properties?location=hurghada" className="text-sand-100 hover:text-gold-400 transition-colors">
                    Hurghada Properties
                  </Link>
                </li>
                <li>
                  <Link href="/properties?location=al-gouna" className="text-sand-100 hover:text-gold-400 transition-colors">
                    El Gouna Properties
                  </Link>
                </li>
                <li>
                  <Link href="/properties?location=north-coast" className="text-sand-100 hover:text-gold-400 transition-colors">
                    North Coast Properties
                  </Link>
                </li>
                <li>
                  <Link href="/properties?location=cairo" className="text-sand-100 hover:text-gold-400 transition-colors">
                    Cairo Properties
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-gold-400">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaPhone className="text-gold-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sand-100">UK: {contactInfo.phone.uk}</p>
                    <p className="text-sand-100">Egypt: {contactInfo.phone.egypt}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaEnvelope className="text-gold-400 mt-1 flex-shrink-0" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sand-100 hover:text-gold-400 transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-gold-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sand-100 text-sm">{contactInfo.address.uk}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sand-200">
            <p>© {currentYear} Notion Homes. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-gold-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-gold-400 transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
