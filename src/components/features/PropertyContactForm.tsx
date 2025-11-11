'use client';

import { useState } from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Property } from '@/types';
import { contactInfo } from '@/data/contact';

interface PropertyContactFormProps {
  property: Property;
}

export const PropertyContactForm: React.FC<PropertyContactFormProps> = ({ property }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hi, I'm interested in ${property.title}`
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add form submission logic
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you soon.');
  };

  return (
    <Card className="p-6 !bg-charcoal-green">
      <h3 className="text-xl font-bold text-cream-light mb-6">Inquire About This Property</h3>

      <form onSubmit={handleSubmit} className="space-y-5 mb-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold mb-2"
            style={{ color: '#F5F3EF !important' }}
          >
            Your Name *
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all"
            placeholder="John Doe"
            style={{
              backgroundColor: '#F5F3EF',
              borderColor: '#C8B898',
              color: '#1A1A1A',
              caretColor: '#1A1A1A'
            }}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold mb-2"
            style={{ color: '#F5F3EF !important' }}
          >
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all"
            placeholder="john@example.com"
            style={{
              backgroundColor: '#F5F3EF',
              borderColor: '#C8B898',
              color: '#1A1A1A',
              caretColor: '#1A1A1A'
            }}
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold mb-2"
            style={{ color: '#F5F3EF !important' }}
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all"
            placeholder="+44 20 1234 5678"
            style={{
              backgroundColor: '#F5F3EF',
              borderColor: '#C8B898',
              color: '#1A1A1A',
              caretColor: '#1A1A1A'
            }}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold mb-2"
            style={{ color: '#F5F3EF !important' }}
          >
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none resize-none transition-all"
            style={{
              backgroundColor: '#F5F3EF',
              borderColor: '#C8B898',
              color: '#1A1A1A',
              caretColor: '#1A1A1A'
            }}
          />
        </div>

        <Button type="submit" fullWidth variant="filled" className="!bg-sage-tan !text-dark-olive hover:!bg-sage-tan/90 font-semibold">
          Submit Inquiry
        </Button>
      </form>

      <div className="pt-6 border-t border-slate-gray">
        <p className="text-sm text-cream-light mb-4 text-center font-medium">Or contact us directly</p>

        <div className="space-y-3">
          <a
            href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in ${property.title} (ID: ${property.id})`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button fullWidth variant="filled" icon={<FaWhatsapp />} className="!bg-[#25D366] hover:!bg-[#20BA5A] !text-white">
              WhatsApp Inquiry
            </Button>
          </a>

          <a href={`tel:${contactInfo.phone.uk.replace(/\s/g, '')}`} className="block">
            <Button fullWidth variant="outline" icon={<FaPhone />} className="!border-sage-tan !text-sage-tan hover:!bg-sage-tan hover:!text-dark-olive">
              Call Us
            </Button>
          </a>

          <a href={`mailto:${contactInfo.email}?subject=Inquiry about ${property.title}`} className="block">
            <Button fullWidth variant="outline" icon={<FaEnvelope />} className="!border-sage-tan !text-sage-tan hover:!bg-sage-tan hover:!text-dark-olive">
              Email Us
            </Button>
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-gray text-sm text-cream-light space-y-2">
          <p><strong className="text-sage-tan">UK Office:</strong> {contactInfo.phone.uk}</p>
          <p><strong className="text-sage-tan">Egypt Office:</strong> {contactInfo.phone.egypt}</p>
        </div>
      </div>
    </Card>
  );
};
