import React from 'react';
import { AboutHero } from '@/components/about/AboutHero';
import { MissionVision } from '@/components/about/MissionVision';
import { CompanyDetails } from '@/components/about/CompanyDetails';
import { CTASection } from '@/components/home/CTASection';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-cream-bg">
            <AboutHero />
            <MissionVision />
            <CompanyDetails />
            <CTASection />
        </main>
    );
}
