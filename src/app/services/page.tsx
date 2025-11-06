import React from 'react';
import { FaHome, FaCalendar, FaTools, FaPlane, FaCheckCircle } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { services } from '@/data/services';
import Link from 'next/link';

const iconMap: Record<string, React.ElementType> = {
  home: FaHome,
  calendar: FaCalendar,
  tools: FaTools,
  plane: FaPlane,
};

export default function ServicesPage() {
  return (
    <main className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-gold-400">Services</span>
            </h1>
            <p className="text-sand-100 text-lg md:text-xl leading-relaxed">
              From property acquisition to complete management solutions, we provide comprehensive
              services to make your Egyptian property journey seamless and rewarding.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Details */}
      <section className="section-padding bg-sand-50">
        <Container>
          <div className="space-y-20">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon];
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`scroll-mt-32 ${isEven ? '' : ''}`}
                >
                  <Card className="overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Icon/Image Side */}
                      <div className={`bg-gradient-to-br from-navy-900 to-navy-800 p-12 flex items-center justify-center ${isEven ? '' : 'lg:order-2'}`}>
                        <div className="text-center">
                          <div className="w-32 h-32 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Icon className="text-6xl text-gold-400" />
                          </div>
                          <h3 className="text-3xl font-bold text-white mb-4">
                            {service.title}
                          </h3>
                          <p className="text-sand-200 text-lg">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Content Side */}
                      <div className="p-8 lg:p-12">
                        {/* Benefits */}
                        <div className="mb-8">
                          <h4 className="text-xl font-bold text-navy-900 mb-4">Benefits</h4>
                          <div className="space-y-3">
                            {service.benefits.map((benefit, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <FaCheckCircle className="text-gold-600 mt-1 flex-shrink-0" />
                                <span className="text-charcoal-800">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Process */}
                        <div>
                          <h4 className="text-xl font-bold text-navy-900 mb-4">Our Process</h4>
                          <ol className="space-y-3">
                            {service.process.map((step, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-gold-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                  {i + 1}
                                </span>
                                <span className="text-charcoal-800">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div className="mt-8">
                          <Link href="/contact">
                            <Button variant="primary">Get Started</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-charcoal-800 text-lg mb-8">
              Contact us today to discuss how we can help you with your Egyptian property needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="primary">
                  Contact Us
                </Button>
              </Link>
              <Link href="/properties">
                <Button size="lg" variant="outline">
                  Browse Properties
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
