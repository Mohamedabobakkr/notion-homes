import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limiter';
import { validateCsrf, validateContentType } from '@/lib/csrf';
import { sanitizeForEmail } from '@/lib/sanitize';
import { logger } from '@/lib/logger';

const contactSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(255),
    phone: z.string().min(10).max(20),
    propertyInterest: z.string().max(50).optional(),
    message: z.string().min(10).max(2000),
});

export async function POST(request: Request) {
    try {
        // CSRF Protection
        const csrfError = validateCsrf(request);
        if (csrfError) return csrfError;

        // Content-Type validation
        const contentTypeError = validateContentType(request);
        if (contentTypeError) return contentTypeError;

        // Rate limiting: 5 requests per minute
        const rateLimitError = rateLimit(request, {
            maxRequests: 5,
            windowMs: 60 * 1000,
            message: 'Too many contact form submissions. Please try again in a minute.',
        });
        if (rateLimitError) return rateLimitError;

        const body = await request.json();
        const validatedData = contactSchema.parse(body);

        // Sanitize all user input to prevent XSS
        const sanitizedData = {
            name: sanitizeForEmail(validatedData.name),
            email: sanitizeForEmail(validatedData.email),
            phone: sanitizeForEmail(validatedData.phone),
            propertyInterest: validatedData.propertyInterest
                ? sanitizeForEmail(validatedData.propertyInterest)
                : 'Not specified',
            message: sanitizeForEmail(validatedData.message),
        };

        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A3B28;">New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
        <p><strong>Interest:</strong> ${sanitizedData.propertyInterest}</p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p><strong>Message:</strong></p>
          <p>${sanitizedData.message}</p>
        </div>
      </div>
    `;

        const success = await sendEmail({
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER || '',
            subject: `New Inquiry from ${sanitizedData.name} - Notion Homes`,
            html: htmlContent,
        });

        if (!success) {
            logger.error('Email sending failed for contact form');
            return NextResponse.json(
                { error: 'Failed to send your inquiry. Please try again later.' },
                { status: 500 }
            );
        }

        logger.info('Contact form submitted successfully');

        return NextResponse.json(
            { message: 'Inquiry sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            logger.warn('Contact form validation failed', { errors: error.issues });
            return NextResponse.json(
                { error: 'Please check your form inputs and try again.' },
                { status: 400 }
            );
        }

        logger.error('Contact form submission error', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}
