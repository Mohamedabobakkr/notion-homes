'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

export const AboutHero: React.FC = () => {
    return (
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
                    alt="Luxury Interior"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <Container className="relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold !text-white mb-6 drop-shadow-xl" style={{ color: 'white' }}>
                        Our Story
                    </h1>
                    <p className="text-lg md:text-xl !text-white/95 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                        Redefining the standard of luxury real estate in Egypt. We bridge the gap between dream homes and reality with elegance and integrity.
                    </p>
                </motion.div>
            </Container>
        </section>
    );
};
