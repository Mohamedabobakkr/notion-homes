'use client';

import { Container } from '@/components/ui/Container';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <main className="pt-32 pb-20 bg-cream-light min-h-screen">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-dark-olive mb-6">
                        About Notion Homes
                    </h1>
                    <p className="text-lg text-text-secondary leading-relaxed mb-8">
                        We are a premier real estate agency specializing in luxury properties across Egypt and the UK.
                        Our mission is to connect discerning clients with their dream homes, offering a seamless
                        and personalized experience from search to acquisition.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold text-dark-olive mb-3">Expertise</h3>
                            <p className="text-text-secondary">
                                Years of experience in the luxury real estate market.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold text-dark-olive mb-3">Integrity</h3>
                            <p className="text-text-secondary">
                                Transparent and honest guidance throughout your journey.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold text-dark-olive mb-3">Excellence</h3>
                            <p className="text-text-secondary">
                                Commitment to the highest standards of service.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </main>
    );
}
