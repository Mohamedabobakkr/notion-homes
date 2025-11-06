'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { testimonials } from '@/data/testimonials';

export const TestimonialsSection: React.FC = () => {
  // Show first 3 testimonials
  const displayedTestimonials = testimonials.slice(0, 3);

  return (
    <section className="section-padding-lg bg-sand-50">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold-600 text-lg mb-4 tracking-wider uppercase font-medium">
            Client Stories
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-charcoal-800 text-lg md:text-xl max-w-3xl mx-auto">
            Don't just take our word for it. Hear from UK clients who've successfully
            found their dream Egyptian properties with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover={false} className="h-full p-8">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-gold-500 text-lg" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-charcoal-800 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-sand-200">
                  <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-gold-600">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-navy-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-charcoal-800">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
