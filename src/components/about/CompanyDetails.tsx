'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { FaBuilding, FaMapMarkerAlt, FaFacebookF, FaInstagram } from 'react-icons/fa';

export const CompanyDetails: React.FC = () => {
    return (
        <section className="section-padding bg-white">
            <Container>
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        {/* Company Information */}
                        <div>
                            <h2 className="text-3xl font-heading font-bold text-dark-olive mb-8">
                                Company Details
                            </h2>

                            <div className="space-y-8">
                                {/* Registration */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-cream-bg flex items-center justify-center flex-shrink-0 text-olive-green">
                                        <FaBuilding className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-dark-olive mb-1">Registration</h3>
                                        <p className="text-gray-600">Company No. 16841967</p>
                                    </div>
                                </div>

                                {/* UK Address */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-cream-bg flex items-center justify-center flex-shrink-0 text-olive-green">
                                        <FaMapMarkerAlt className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-dark-olive mb-1">UK Headquarters</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Springhead Pkway, Northfleet,<br />
                                            Gravesend, DA11 8AD
                                        </p>
                                    </div>
                                </div>

                                {/* Egypt Address */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-cream-bg flex items-center justify-center flex-shrink-0 text-olive-green">
                                        <FaMapMarkerAlt className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-dark-olive mb-1">Egypt Office</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            South Marina Dr, Sahl Hasheesh,<br />
                                            Red Sea, 84521
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h2 className="text-3xl font-heading font-bold text-dark-olive mb-8">
                                Connect With Us
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Follow our journey and stay updated with the latest luxury property listings and market insights.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <a
                                    href="https://www.facebook.com/profile.php?id=61583631207320"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-6 rounded-xl border border-gray-200 hover:border-olive-green/30 hover:bg-cream-bg/50 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <FaFacebookF />
                                    </div>
                                    <span className="font-medium text-dark-olive">Facebook</span>
                                </a>

                                <a
                                    href="https://www.instagram.com/notion.homes/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-6 rounded-xl border border-gray-200 hover:border-olive-green/30 hover:bg-cream-bg/50 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <FaInstagram />
                                    </div>
                                    <span className="font-medium text-dark-olive">Instagram</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};
