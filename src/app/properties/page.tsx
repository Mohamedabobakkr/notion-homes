'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

export default function PropertiesIntentPage() {
  const services = [
    {
      title: 'Buy Property',
      description: 'Explore our exclusive collection of properties for sale across Egypt\'s most desirable locations.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      href: '/buy',
      color: 'from-olive-green/20 to-olive-green/5',
    },
    {
      title: 'Rent Property',
      description: 'Find your perfect rental home with flexible terms and premium locations.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      href: '/rent',
      color: 'from-charcoal-green/20 to-charcoal-green/5',
    },
    {
      title: 'List Your Property',
      description: 'Partner with us to sell or rent your property with professional marketing and support.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: '/list',
      color: 'from-olive-green/20 to-olive-green/5',
    },
    {
      title: 'Other Services',
      description: 'Discover our full range of property services including investment consulting and property management.',
      icon: (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: '/contact',
      color: 'from-charcoal-green/20 to-charcoal-green/5',
    },
  ];

  return (
    <main className="min-h-screen bg-cream-light">
      <section className="py-16 md:py-24">
        <Container>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-text-primary mb-6">
              How Can We Help You?
            </h1>
            <p className="text-lg md:text-xl text-text-primary/70 max-w-3xl mx-auto">
              Select the service that best matches your needs, and we'll guide you to the perfect solution.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <div className={`
                    group relative overflow-hidden
                    bg-gradient-to-br ${service.color}
                    border-2 border-border-light
                    rounded-2xl p-8
                    hover:border-olive-green
                    hover:shadow-xl
                    transition-all duration-300
                    cursor-pointer
                    h-full
                  `}>
                    {/* Icon */}
                    <div className="w-16 h-16 mb-6 text-olive-green transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>

                    {/* Content */}
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 group-hover:text-olive-green transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-text-primary/70 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* CTA */}
                    <div className="inline-flex items-center gap-2 text-olive-green font-semibold group-hover:gap-4 transition-all">
                      <span>Get Started</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>

                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-olive-green/0 to-olive-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Back to Home Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link href="/" className="text-text-primary/60 hover:text-olive-green transition-colors">
              ← Back to Home
            </Link>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
