'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { FaGem, FaGlobe, FaHandshake } from 'react-icons/fa';

const values = [
    {
        title: 'Our Mission',
        description: 'To provide seamless, transparent, and exceptional property journeys for every client. We strive to simplify the complexities of the real estate market, offering expert guidance and personalized service that turns transactions into lasting relationships.',
        icon: FaHandshake,
    },
    {
        title: 'Our Vision',
        description: 'To be the most trusted and prestigious luxury real estate partner in Egypt and beyond. We envision a future where finding a dream home is an inspiring and effortless experience, defined by integrity and innovation.',
        icon: FaGlobe,
    },
    {
        title: 'Our Goal',
        description: 'Connecting discerning clients with their perfect properties. Whether it is a beachfront villa or a city apartment, our ultimate goal is to match unique lifestyles with extraordinary spaces that feel like home.',
        icon: FaGem,
    },
];

export const MissionVision: React.FC = () => {
    return (
        <section className="section-padding bg-cream-bg">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-olive-green/10 hover:shadow-md transition-shadow duration-300 text-center group"
                        >
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-olive-green/5 flex items-center justify-center group-hover:bg-olive-green/10 transition-colors">
                                <value.icon className="text-3xl text-olive-green" />
                            </div>
                            <h3 className="text-2xl font-heading font-semibold text-dark-olive mb-4">
                                {value.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
};
