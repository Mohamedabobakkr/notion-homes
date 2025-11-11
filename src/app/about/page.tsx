import React from 'react';
import { FaAward, FaUsers, FaHandshake, FaGlobe, FaCheckCircle } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark-olive via-charcoal-green to-slate-gray text-cream-light py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-cream-light">Notion Homes</span>
            </h1>
            <p className="text-cream-light text-lg md:text-xl leading-relaxed">
              Your trusted bridge between UK and Egyptian real estate, specializing in luxury
              properties across Egypt's most prestigious destinations.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-charcoal-green">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-cream-light mb-6 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-cream-light text-lg leading-relaxed">
              <p>
                Founded with a vision to connect UK clients with exceptional Egyptian properties,
                Notion Homes has become the premier choice for discerning buyers and investors
                seeking luxury real estate in Egypt.
              </p>
              <p>
                With over 15 years of combined experience in UK and Egyptian property markets,
                our team understands the unique needs of British clients looking to invest in
                Egyptian real estate. We bridge the gap between two countries, offering
                unparalleled local expertise with the service standards UK clients expect.
              </p>
              <p>
                From the pristine beaches of Hurghada and the sophisticated marina of El Gouna,
                to the Mediterranean charm of the North Coast and the cosmopolitan appeal of Cairo,
                we've helped over 1,000 clients find their perfect Egyptian property.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-slate-gray">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-cream-light mb-12 text-center">
            Why Choose Notion Homes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaAward,
                title: 'Local Expertise',
                description: 'Deep knowledge of Egyptian property market with on-ground presence in all major locations.',
              },
              {
                icon: FaUsers,
                title: 'UK Support',
                description: 'Dedicated UK team providing support in your timezone and language throughout your journey.',
              },
              {
                icon: FaHandshake,
                title: 'End-to-End Service',
                description: 'From property search to post-purchase management, we handle everything for you.',
              },
              {
                icon: FaGlobe,
                title: 'International Reach',
                description: 'Bridging UK and Egypt with offices in both countries for seamless transactions.',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="text-center p-8 !bg-charcoal-green">
                  <div className="w-16 h-16 bg-sage-tan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-3xl text-sage-tan" />
                  </div>
                  <h3 className="text-xl font-bold text-cream-light mb-4">
                    {item.title}
                  </h3>
                  <p className="text-cream-light leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-dark-olive">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-cream-light mb-12 text-center">
              Our Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Transparency',
                  description: 'Clear, honest communication at every step. No hidden fees, no surprises.',
                },
                {
                  title: 'Excellence',
                  description: 'Curated selection of only the finest properties meeting our strict quality standards.',
                },
                {
                  title: 'Trust',
                  description: 'Building long-term relationships based on reliability and professional integrity.',
                },
                {
                  title: 'Client-First',
                  description: 'Your needs and satisfaction are at the heart of everything we do.',
                },
              ].map((value, index) => (
                <div key={index} className="flex gap-4">
                  <FaCheckCircle className="text-sage-tan text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-cream-light mb-2">{value.title}</h3>
                    <p className="text-cream-light leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="section-padding bg-gradient-to-br from-charcoal-green via-slate-gray to-dark-olive text-cream-light">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Properties Sold' },
              { value: '1000+', label: 'Happy Clients' },
              { value: '15+', label: 'Years Experience' },
              { value: '4', label: 'Prime Locations' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-cream-light mb-2">
                  {stat.value}
                </div>
                <div className="text-cream-light">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-slate-gray">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-cream-light mb-12 text-center">
            Our Leadership Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Omar Tamer',
                role: 'Co-Founder & CEO',
                credentials: ['15+ years property experience', 'UK & Egypt markets expert'],
              },
              {
                name: 'ZI',
                role: 'Co-Founder & Head of UK Relations',
                credentials: ['UK client services', 'Investment advisor'],
              },
            ].map((member, index) => (
              <Card key={index} className="text-center p-8 !bg-charcoal-green">
                <div className="w-24 h-24 bg-sage-tan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-bold text-sage-tan">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-cream-light mb-2">
                  {member.name}
                </h3>
                <p className="text-cream-light font-medium mb-4">{member.role}</p>
                <div className="space-y-2">
                  {member.credentials.map((cred, i) => (
                    <p key={i} className="text-sm text-cream-light">{cred}</p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding bg-dark-olive">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-cream-light mb-6">
              Ready to Start Your Egyptian Property Journey?
            </h2>
            <p className="text-cream-light text-lg mb-8">
              Let's discuss how we can help you find your perfect property in Egypt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="filled">
                  Get in Touch
                </Button>
              </Link>
              <Link href="/properties">
                <Button size="lg" variant="outline">
                  View Properties
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
