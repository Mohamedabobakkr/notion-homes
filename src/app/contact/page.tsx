'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { contactInfo } from '@/data/contact';
import { InquiryFormData } from '@/types';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InquiryFormData>({
    mode: 'onBlur', // Validate on blur (when field loses focus)
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit inquiry');
      }

      toast.success('Thank you! We\'ll get back to you within 24 hours.');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: 'Can UK citizens buy property in Egypt?',
      answer: 'Yes, UK citizens can buy property in Egypt. We handle all legal documentation and guide you through the entire process.',
    },
    {
      question: 'What are the payment options?',
      answer: 'We offer flexible payment options including bank transfers in GBP or EGP. Many properties also offer installment plans.',
    },
    {
      question: 'Do you offer property management services?',
      answer: 'Yes, we provide comprehensive property management including maintenance, rental management, and regular inspections.',
    },
    {
      question: 'How long does the buying process take?',
      answer: 'Typically 4-8 weeks from offer acceptance to completion, depending on financing and legal checks.',
    },
    {
      question: 'Can I visit properties before purchasing?',
      answer: 'Absolutely! We arrange property viewings and offer curated trip packages combining viewings with Egyptian experiences.',
    },
    {
      question: 'What are the ongoing costs?',
      answer: 'Ongoing costs include property tax, maintenance fees (if applicable), and utilities. We provide a full breakdown for each property.',
    },
  ];

  return (
    <>
      <Toaster position="top-center" />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-dark-olive via-charcoal-green to-slate-gray text-cream-light py-20">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Get in <span className="text-cream-light">Touch</span>
              </h1>
              <p className="text-cream-light text-lg md:text-xl leading-relaxed">
                Have questions about Egyptian properties? Our expert team is here to help.
                Reach out today and let's start your property journey.
              </p>
            </div>
          </Container>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding bg-slate-gray">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="p-8 !bg-charcoal-green">
                  <h2 className="text-2xl font-bold text-cream-light mb-6">
                    Send Us a Message
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Your Name *"
                        {...register('name', {
                          required: 'Name is required',
                          minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters',
                          },
                          pattern: {
                            value: /^[A-Za-z\s'-]+$/,
                            message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
                          },
                        })}
                        error={errors.name?.message}
                        placeholder="John Smith"
                      />

                      <Input
                        label="Email Address *"
                        type="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Please enter a valid email address',
                          },
                        })}
                        error={errors.email?.message}
                        placeholder="john@example.com"
                      />
                    </div>

                    <Input
                      label="Phone Number *"
                      type="tel"
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
                          message: 'Please enter a valid phone number',
                        },
                        minLength: {
                          value: 10,
                          message: 'Phone number must be at least 10 digits',
                        },
                      })}
                      error={errors.phone?.message}
                      placeholder="+44 20 1234 5678"
                    />

                    <div>
                      <label className="block text-sm font-medium text-dark-olive mb-2">
                        Property Interest
                      </label>
                      <select
                        {...register('propertyInterest')}
                        className="w-full px-4 py-3 bg-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-tan text-dark-olive"
                        style={{
                          borderColor: '#C8B898'
                        }}
                      >
                        <option value="">Select an option</option>
                        <option value="buy">Looking to Buy</option>
                        <option value="rent">Looking to Rent</option>
                        <option value="sell">Want to Sell</option>
                        <option value="manage">Property Management</option>
                        <option value="trip">Trip Package</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>

                    <Textarea
                      label="Your Message *"
                      {...register('message', { required: 'Message is required' })}
                      error={errors.message?.message}
                      placeholder="Tell us about your requirements..."
                      rows={6}
                    />

                    <Button
                      type="submit"
                      variant="filled"
                      size="lg"
                      fullWidth
                      disabled={isSubmitting}
                      icon={<FaPaperPlane />}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                {/* Phone */}
                <Card className="p-6 !bg-cream-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sage-tan/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-sage-tan text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-dark-olive mb-3">Call Us</h3>
                      <a
                        href={`tel:${contactInfo.phone.uk.replace(/\s/g, '')}`}
                        className="block text-dark-olive hover:text-olive-green hover:underline transition-colors mb-2"
                      >
                        <strong>UK:</strong> {contactInfo.phone.uk}
                      </a>
                      <a
                        href={`tel:${contactInfo.phone.egypt.replace(/\s/g, '')}`}
                        className="block text-dark-olive hover:text-olive-green hover:underline transition-colors"
                      >
                        <strong>Egypt:</strong> {contactInfo.phone.egypt}
                      </a>
                    </div>
                  </div>
                </Card>

                {/* Email */}
                <Card className="p-6 !bg-cream-card">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-sage-tan/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-sage-tan/30 transition-colors">
                      <FaEnvelope className="text-sage-tan text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark-olive mb-2 group-hover:text-olive-green transition-colors">Email Us</h3>
                      <p className="text-dark-olive text-sm group-hover:underline font-bold">
                        {contactInfo.email}
                      </p>
                    </div>
                  </a>
                </Card>

                {/* WhatsApp */}
                <Card className="p-6 !bg-cream-card">
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-sage-tan/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-sage-tan/30 transition-colors">
                      <FaWhatsapp className="text-sage-tan text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark-olive mb-2 group-hover:text-olive-green transition-colors">WhatsApp</h3>
                      <p className="text-dark-olive text-sm group-hover:underline font-bold">
                        {contactInfo.whatsapp}
                      </p>
                    </div>
                  </a>
                </Card>

                {/* Offices */}
                <Card className="p-6 !bg-cream-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sage-tan/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="text-sage-tan text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark-olive mb-2">Our Offices</h3>
                      <div className="space-y-3 text-sm text-dark-olive">
                        <div>
                          <p className="font-bold text-dark-olive mb-1">UK Office</p>
                          <p>{contactInfo.address.uk}</p>
                        </div>
                        <div>
                          <p className="font-bold text-dark-olive mb-1">Egypt Office</p>
                          <p>{contactInfo.address.egypt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* Map Placeholder */}
        {/* Map Section */}
        <section className="py-12 bg-slate-gray">
          <Container>
            <div className="h-[500px] w-full relative rounded-xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(contactInfo.address.uk)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Notion Homes UK Office"
                className="w-full h-full"
              ></iframe>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-slate-gray">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold text-cream-light mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6 !bg-charcoal-green">
                  <h3 className="text-lg font-bold text-cream-light mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-cream-light leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-cream-light mb-4">
                Don't see your question? We're here to help!
              </p>
              <a href={`mailto:${contactInfo.email}`}>
                <Button variant="outline">
                  Ask Your Question
                </Button>
              </a>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
