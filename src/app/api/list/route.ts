import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limiter';
import { validateCsrf, validateContentType } from '@/lib/csrf';
import { sanitizeForEmail } from '@/lib/sanitize';
import { logger } from '@/lib/logger';

const listingSchema = z.object({
    ownerName: z.string().min(2).max(100),
    ownerEmail: z.string().email().max(255),
    ownerPhone: z.string().min(10).max(20),
    propertyTitle: z.string().min(5).max(200),
    propertyType: z.string().max(50),
    listingType: z.string().max(50),
    location: z.string().max(100),
    address: z.string().min(5).max(300),
    bedrooms: z.coerce.number().min(1).max(50),
    bathrooms: z.coerce.number().min(1).max(50),
    size: z.coerce.number().min(1).max(100000),
    priceGBP: z.coerce.number().min(1).max(1000000000),
    priceEGP: z.coerce.number().min(1).max(1000000000).optional(),
    description: z.string().min(50).max(5000),
    features: z.string().max(2000),
});

export async function POST(request: Request) {
    try {
        // CSRF Protection
        const csrfError = validateCsrf(request);
        if (csrfError) return csrfError;

        // Content-Type validation
        const contentTypeError = validateContentType(request);
        if (contentTypeError) return contentTypeError;

        // Rate limiting: 3 requests per hour for property listings
        const rateLimitError = rateLimit(request, {
            maxRequests: 3,
            windowMs: 60 * 60 * 1000,
            message: 'Too many property listing submissions. Please try again later.',
        });
        if (rateLimitError) return rateLimitError;

        const body = await request.json();
        const validatedData = listingSchema.parse(body);

        // Sanitize all user input to prevent XSS
        const sanitizedData = {
            ownerName: sanitizeForEmail(validatedData.ownerName),
            ownerEmail: sanitizeForEmail(validatedData.ownerEmail),
            ownerPhone: sanitizeForEmail(validatedData.ownerPhone),
            propertyTitle: sanitizeForEmail(validatedData.propertyTitle),
            propertyType: sanitizeForEmail(validatedData.propertyType),
            listingType: sanitizeForEmail(validatedData.listingType),
            location: sanitizeForEmail(validatedData.location),
            address: sanitizeForEmail(validatedData.address),
            bedrooms: validatedData.bedrooms,
            bathrooms: validatedData.bathrooms,
            size: validatedData.size,
            priceGBP: validatedData.priceGBP,
            priceEGP: validatedData.priceEGP,
            description: sanitizeForEmail(validatedData.description),
            features: sanitizeForEmail(validatedData.features),
        };

        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A3B28;">New Property Listing Submission</h2>

        <h3 style="color: #DBC086; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Owner Information</h3>
        <p><strong>Name:</strong> ${sanitizedData.ownerName}</p>
        <p><strong>Email:</strong> ${sanitizedData.ownerEmail}</p>
        <p><strong>Phone:</strong> ${sanitizedData.ownerPhone}</p>

        <h3 style="color: #DBC086; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 20px;">Property Details</h3>
        <p><strong>Title:</strong> ${sanitizedData.propertyTitle}</p>
        <p><strong>Type:</strong> ${sanitizedData.propertyType}</p>
        <p><strong>Listing For:</strong> ${sanitizedData.listingType}</p>
        <p><strong>Location:</strong> ${sanitizedData.location}</p>
        <p><strong>Address:</strong> ${sanitizedData.address}</p>

        <div style="display: flex; gap: 20px;">
          <p><strong>Bedrooms:</strong> ${sanitizedData.bedrooms}</p>
          <p><strong>Bathrooms:</strong> ${sanitizedData.bathrooms}</p>
          <p><strong>Size:</strong> ${sanitizedData.size} sqm</p>
        </div>

        <p><strong>Price (GBP):</strong> £${sanitizedData.priceGBP.toLocaleString()}</p>
        ${sanitizedData.priceEGP ? `<p><strong>Price (EGP):</strong> EGP ${sanitizedData.priceEGP.toLocaleString()}</p>` : ''}

        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p><strong>Description:</strong></p>
          <p>${sanitizedData.description}</p>
          <p><strong>Features:</strong></p>
          <p>${sanitizedData.features}</p>
        </div>
      </div>
    `;

        const success = await sendEmail({
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER || '',
            subject: `New Property Listing: ${sanitizedData.propertyTitle}`,
            html: htmlContent,
        });

        if (!success) {
            logger.error('Email sending failed for property listing');
            return NextResponse.json(
                { error: 'Failed to submit your listing. Please try again later.' },
                { status: 500 }
            );
        }

        logger.info('Property listing submitted successfully', {
            email: validatedData.ownerEmail,
            propertyTitle: validatedData.propertyTitle,
        });

        return NextResponse.json(
            { message: 'Listing submitted successfully' },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            logger.warn('Property listing validation failed', { errors: error.issues });
            return NextResponse.json(
                { error: 'Please check your form inputs and try again.' },
                { status: 400 }
            );
        }

        logger.error('Property listing submission error', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}
