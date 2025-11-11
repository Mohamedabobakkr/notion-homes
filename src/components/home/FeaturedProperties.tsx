'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PropertyCard } from '@/components/features/PropertyCard';
import { getFeaturedProperties } from '@/lib/sanity-queries';
import { Property } from '@/types';

export const FeaturedProperties: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      const data = await getFeaturedProperties();
      setFeaturedProperties(data);
      setLoading(false);
    }
    fetchProperties();
  }, []);

  if (loading) {
    return (
      <section className="section-padding-lg bg-charcoal-green">
        <Container>
          <div className="text-center py-16">
            <p className="text-xl text-cream-light">Loading featured properties...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="section-padding-lg bg-charcoal-green">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cream-light text-lg mb-4 tracking-wider uppercase font-medium">
            Handpicked Selection
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream-light mb-6">
            Featured Properties
          </h2>
          <p className="text-cream-light text-lg md:text-xl max-w-3xl mx-auto">
            Discover our carefully curated collection of luxury properties across Egypt's
            most prestigious locations.
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/properties">
            <Button size="lg" variant="filled">
              View All Properties
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};
