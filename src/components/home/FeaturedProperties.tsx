'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FeaturedPropertyCard } from '@/components/home/FeaturedPropertyCard';
import { getFeaturedProperties } from '@/lib/sanity-queries';
import { Property } from '@/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
    <section className="section-padding-lg bg-cream-bg relative overflow-hidden">
      {/* Background Pattern - Subtle Texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat opacity-10"></div>
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-olive-dark/30"></span>
            <p className="text-olive-dark text-sm tracking-[0.2em] uppercase font-medium">
              Handpicked Selection
            </p>
            <span className="h-px w-8 bg-olive-dark/30"></span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-olive-dark mb-6">
            Featured Properties
          </h2>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Discover our carefully curated collection of luxury properties across Egypt's
            most prestigious locations.
          </p>
        </motion.div>

        {/* Properties Slider */}
        {featuredProperties.length > 0 ? (
          <div className="mb-16">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="featured-properties-slider !pb-12"
            >
              {featuredProperties.map((property, index) => (
                <SwiperSlide key={property.id} className="h-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <FeaturedPropertyCard property={property} />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="text-center py-12 mb-12 bg-white/50 rounded-2xl border border-olive-dark/5 backdrop-blur-sm">
            <p className="text-xl text-text-secondary font-light italic">
              No featured properties available at the moment.
            </p>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/properties">
            <Button
              size="lg"
              variant="filled"
              className="!bg-olive-dark !text-cream-light hover:!bg-olive-green hover:!scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold px-10"
            >
              View All Properties
            </Button>
          </Link>
        </motion.div>
      </Container>

      {/* Custom Styles for Swiper Navigation */}
      <style jsx global>{`
        .featured-properties-slider .swiper-button-next,
        .featured-properties-slider .swiper-button-prev {
          color: #2C3E30; /* olive-dark */
          background: rgba(255, 255, 255, 0.8);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .featured-properties-slider .swiper-button-next:after,
        .featured-properties-slider .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }
        .featured-properties-slider .swiper-pagination-bullet-active {
          background-color: #2C3E30; /* olive-dark */
        }
      `}</style>
    </section>
  );
};
