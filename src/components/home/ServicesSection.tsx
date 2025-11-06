'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHome, FaCalendar, FaTools, FaPlane } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

const services = [
  {
    icon: FaHome,
    title: 'Property Sales',
    description: 'Find your perfect Egyptian property with expert guidance and full legal support.',
    link: '/services#property-sales',
  },
  {
    icon: FaCalendar,
    title: 'Vacation Rentals',
    description: 'Discover luxury short-term rentals for your perfect Egyptian getaway.',
    link: '/services#vacation-rentals',
  },
  {
    icon: FaTools,
    title: 'Property Management',
    description: 'Comprehensive management services for overseas property owners.',
    link: '/services#property-management',
  },
  {
    icon: FaPlane,
    title: 'Curated Trip Packages',
    description: 'Combine property viewing with an unforgettable Egyptian experience.',
    link: '/services#trip-packages',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section className="section-padding-lg bg-surface">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-teal-primary text-lg mb-4 tracking-wider uppercase font-medium">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-teal-dark mb-6">
            Our Services
          </h2>
          <p className="text-teal-primary/80 text-lg md:text-xl max-w-3xl mx-auto">
            From property sales to complete management solutions, we provide end-to-end
            services for your Egyptian property journey.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={service.link}>
                  <Card className="h-full text-center p-8 hover:border-gold-500 border-2 border-transparent transition-all">
                    <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="text-3xl text-gold-600" />
                    </div>
                    <h3 className="text-xl font-bold text-teal-dark mb-4 font-heading">
                      {service.title}
                    </h3>
                    <p className="text-teal-primary/70 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-6 text-teal-primary font-medium">
                      Learn More →
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
