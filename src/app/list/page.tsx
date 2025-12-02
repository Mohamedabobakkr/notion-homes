'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import { FaHome, FaBed, FaBath, FaRulerCombined, FaPoundSign, FaUser } from 'react-icons/fa';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface ListPropertyFormData {
  // Owner Information
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;

  // Property Information
  propertyTitle: string;
  propertyType: 'villa' | 'apartment' | 'penthouse';
  listingType: 'for-sale' | 'for-rent' | 'both';
  location: 'hurghada' | 'al-gouna' | 'north-coast' | 'cairo' | 'london';
  address: string;

  // Property Details
  bedrooms: number;
  bathrooms: number;
  size: number;
  priceGBP: number;
  priceEGP?: number;

  // Description
  description: string;
  features: string;
}

export default function ListPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ListPropertyFormData>();

  const onSubmit = async (data: ListPropertyFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit listing');
      }

      toast.success('Property listing submitted successfully! We will review and contact you soon.');
      reset();
    } catch (error) {
      console.error('Error submitting property:', error);
      toast.error('Failed to submit property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-20 bg-dark-olive">
      <Toaster position="top-center" />
      <Container>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12 text-center px-4"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-cream-light mb-4 md:mb-6">
            List Your <span className="text-cream-light">Property</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-cream-light max-w-3xl mx-auto">
            Join our exclusive collection of luxury properties. Fill out the form below and our team will get in touch with you shortly.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-charcoal-green rounded-xl shadow-lg p-4 sm:p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 md:space-y-10">
              {/* Owner Information Section */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-cream-light mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                  <FaUser className="text-sage-tan text-lg md:text-xl" />
                  Your Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="ownerName" className="block text-dark-olive mb-2 font-medium">
                      Full Name *
                    </label>
                    <Input
                      id="ownerName"
                      {...register('ownerName', { required: 'Full name is required' })}
                      placeholder="John Doe"
                      error={errors.ownerName?.message}
                    />
                  </div>

                  <div>
                    <label htmlFor="ownerEmail" className="block text-dark-olive mb-2 font-medium">
                      Email Address *
                    </label>
                    <Input
                      id="ownerEmail"
                      type="email"
                      {...register('ownerEmail', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      placeholder="john@example.com"
                      error={errors.ownerEmail?.message}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="ownerPhone" className="block text-dark-olive mb-2 font-medium">
                      Phone Number *
                    </label>
                    <Input
                      id="ownerPhone"
                      type="tel"
                      {...register('ownerPhone', { required: 'Phone number is required' })}
                      placeholder="+20 123 456 7890"
                      error={errors.ownerPhone?.message}
                    />
                  </div>
                </div>
              </div>

              {/* Property Information Section */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-cream-light mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                  <FaHome className="text-sage-tan text-lg md:text-xl" />
                  Property Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="propertyTitle" className="block text-dark-olive mb-2 font-medium">
                      Property Title *
                    </label>
                    <Input
                      id="propertyTitle"
                      {...register('propertyTitle', { required: 'Property title is required' })}
                      placeholder="Luxury Beachfront Villa"
                      error={errors.propertyTitle?.message}
                    />
                  </div>

                  <div>
                    <label htmlFor="propertyType" className="block text-dark-olive mb-2 font-medium">
                      Property Type *
                    </label>
                    <select
                      id="propertyType"
                      {...register('propertyType', { required: 'Property type is required' })}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-tan border-2 bg-white text-dark-olive"
                      style={{
                        borderColor: '#C8B898'
                      }}
                    >
                      <option value="">Select type</option>
                      <option value="villa">Villa</option>
                      <option value="apartment">Apartment</option>
                      <option value="penthouse">Penthouse</option>
                    </select>
                    {errors.propertyType && (
                      <p className="mt-1 text-sm text-red-400">{errors.propertyType.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="listingType" className="block text-dark-olive mb-2 font-medium">
                      Listing Type *
                    </label>
                    <select
                      id="listingType"
                      {...register('listingType', { required: 'Listing type is required' })}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-tan border-2 bg-white text-dark-olive"
                      style={{
                        borderColor: '#C8B898'
                      }}
                    >
                      <option value="">Select listing type</option>
                      <option value="for-sale">For Sale</option>
                      <option value="for-rent">For Rent</option>
                      <option value="both">Both Sale & Rent</option>
                    </select>
                    {errors.listingType && (
                      <p className="mt-1 text-sm text-red-400">{errors.listingType.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-dark-olive mb-2 font-medium">
                      Location *
                    </label>
                    <select
                      id="location"
                      {...register('location', { required: 'Location is required' })}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-tan border-2 bg-white text-dark-olive"
                      style={{
                        borderColor: '#C8B898'
                      }}
                    >
                      <option value="">Select location</option>
                      <option value="hurghada">Hurghada</option>
                      <option value="al-gouna">Al Gouna</option>
                      <option value="north-coast">North Coast</option>
                      <option value="cairo">Cairo</option>
                      <option value="london">London</option>
                    </select>
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-400">{errors.location.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-dark-olive mb-2 font-medium">
                      Street Address *
                    </label>
                    <Input
                      id="address"
                      {...register('address', { required: 'Address is required' })}
                      placeholder="123 Beach Road"
                      error={errors.address?.message}
                    />
                  </div>
                </div>
              </div>

              {/* Property Details Section */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-cream-light mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                  <FaRulerCombined className="text-sage-tan text-lg md:text-xl" />
                  Property Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="bedrooms" className="block text-dark-olive mb-2 font-medium">
                      <FaBed className="inline mr-2" />
                      Bedrooms *
                    </label>
                    <Input
                      id="bedrooms"
                      type="number"
                      {...register('bedrooms', {
                        required: 'Number of bedrooms is required',
                        min: { value: 1, message: 'Minimum 1 bedroom' }
                      })}
                      placeholder="3"
                      error={errors.bedrooms?.message}
                    />
                  </div>

                  <div>
                    <label htmlFor="bathrooms" className="block text-dark-olive mb-2 font-medium">
                      <FaBath className="inline mr-2" />
                      Bathrooms *
                    </label>
                    <Input
                      id="bathrooms"
                      type="number"
                      {...register('bathrooms', {
                        required: 'Number of bathrooms is required',
                        min: { value: 1, message: 'Minimum 1 bathroom' }
                      })}
                      placeholder="2"
                      error={errors.bathrooms?.message}
                    />
                  </div>

                  <div>
                    <label htmlFor="size" className="block text-dark-olive mb-2 font-medium">
                      Size (sqm) *
                    </label>
                    <Input
                      id="size"
                      type="number"
                      {...register('size', {
                        required: 'Property size is required',
                        min: { value: 1, message: 'Size must be positive' }
                      })}
                      placeholder="250"
                      error={errors.size?.message}
                    />
                  </div>

                  <div>
                    <label htmlFor="priceGBP" className="block text-dark-olive mb-2 font-medium">
                      <FaPoundSign className="inline mr-2" />
                      Price (GBP) *
                    </label>
                    <Input
                      id="priceGBP"
                      type="number"
                      {...register('priceGBP', {
                        required: 'Price is required',
                        min: { value: 1, message: 'Price must be positive' }
                      })}
                      placeholder="500000"
                      error={errors.priceGBP?.message}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="priceEGP" className="block text-dark-olive mb-2 font-medium">
                      Price (EGP) <span className="text-sm text-gray-400">(Optional)</span>
                    </label>
                    <Input
                      id="priceEGP"
                      type="number"
                      {...register('priceEGP')}
                      placeholder="15000000"
                    />
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-cream-light mb-4 md:mb-6">
                  Description & Features
                </h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="description" className="block text-dark-olive mb-2 font-medium">
                      Property Description *
                    </label>
                    <Textarea
                      id="description"
                      {...register('description', {
                        required: 'Property description is required',
                        minLength: { value: 50, message: 'Description must be at least 50 characters' }
                      })}
                      rows={6}
                      placeholder="Describe your property in detail..."
                      error={errors.description?.message}
                    />
                  </div>

                  <div>
                    <label htmlFor="features" className="block text-dark-olive mb-2 font-medium">
                      Key Features *
                    </label>
                    <Textarea
                      id="features"
                      {...register('features', { required: 'Please list key features' })}
                      rows={4}
                      placeholder="e.g., Sea view, Private pool, Fully furnished, Smart home system..."
                      error={errors.features?.message}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4 md:pt-6">
                <Button
                  type="submit"
                  size="lg"
                  variant="filled"
                  disabled={isSubmitting}
                  fullWidth
                  className="md:w-auto"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Property Listing'}
                </Button>
              </div>

              {/* Note */}
              <p className="text-center text-sm text-cream-light opacity-70">
                Our team will review your submission and contact you within 2-3 business days.
              </p>
            </form>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-4"
        >
          <div className="text-center p-6 bg-charcoal-green rounded-xl">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-sage-tan rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHome className="text-xl md:text-2xl text-dark-olive" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-cream-light mb-2">Premium Exposure</h3>
            <p className="text-sm md:text-base text-cream-light opacity-80">
              Your property will be featured on our exclusive platform reaching high-net-worth clients.
            </p>
          </div>

          <div className="text-center p-6 bg-charcoal-green rounded-xl">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-sage-tan rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-xl md:text-2xl text-dark-olive" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-cream-light mb-2">Expert Support</h3>
            <p className="text-sm md:text-base text-cream-light opacity-80">
              Our experienced team will guide you through every step of the listing process.
            </p>
          </div>

          <div className="text-center p-6 bg-charcoal-green rounded-xl">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-sage-tan rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPoundSign className="text-xl md:text-2xl text-dark-olive" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-cream-light mb-2">Best Value</h3>
            <p className="text-sm md:text-base text-cream-light opacity-80">
              Competitive commission rates with no hidden fees. You get maximum returns.
            </p>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}
