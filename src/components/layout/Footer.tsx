import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { contactInfo } from '@/data/contact';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream-light text-dark-olive">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-dark-olive font-heading">
                Notion Homes
              </h3>
              <p className="text-dark-olive/90 mb-6 leading-relaxed">
                Your trusted bridge between UK and Egyptian real estate. Specializing in luxury properties across Egypt's most sought-after destinations.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61583631207320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-olive hover:bg-charcoal-green text-cream-light flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/notion.homes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-olive hover:bg-charcoal-green text-cream-light flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-dark-olive font-heading">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-dark-olive/80 hover:text-dark-olive transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/buy" className="text-dark-olive/80 hover:text-dark-olive transition-colors">
                    Buy Property
                  </Link>
                </li>
                <li>
                  <Link href="/rent" className="text-dark-olive/80 hover:text-dark-olive transition-colors">
                    Rent Property
                  </Link>
                </li>
                <li>
                  <Link href="/list" className="text-dark-olive/80 hover:text-dark-olive transition-colors">
                    List Your Property
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-dark-olive/80 hover:text-dark-olive transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="text-dark-olive/80 hover:text-dark-olive transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-dark-olive/80 hover:text-dark-olive transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-dark-olive font-heading">Our Locations</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/buy?location=hurghada" className="text-dark-olive/80 hover:text-dark-olive transition-colors">
                    Hurghada
                  </Link>
                </li>
                <li>
                  <Link href="/buy?location=al-gouna" className="text-dark-olive/80 hover:text-dark-olive transition-colors">
                    Al Gouna
                  </Link>
                </li>
                <li>
                  <Link href="/buy?location=north-coast" className="text-dark-olive/80 hover:text-dark-olive transition-colors">
                    North Coast
                  </Link>
                </li>
                <li>
                  <Link href="/buy?location=cairo" className="text-dark-olive/80 hover:text-dark-olive transition-colors">
                    Cairo
                  </Link>
                </li>
                <li>
                  <Link href="/buy?location=london" className="text-dark-olive/80 hover:text-dark-olive transition-colors">
                    London
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-dark-olive font-heading">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaPhone className="text-sage-tan mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-dark-olive/80">UK: {contactInfo.phone.uk}</p>
                    <p className="text-dark-olive/80">Egypt: {contactInfo.phone.egypt}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaEnvelope className="text-sage-tan mt-1 flex-shrink-0" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-dark-olive/80 hover:text-dark-olive transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-sage-tan mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-dark-olive/80 text-sm">{contactInfo.address.uk}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-sage-tan/30 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-dark-olive/70">
            <p>© {currentYear} Notion Homes INT Limited. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-dark-olive transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-dark-olive transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
