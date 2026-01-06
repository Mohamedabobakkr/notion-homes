import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limiter';
import { validateCsrf, validateContentType } from '@/lib/csrf';
import { sanitizeForEmail } from '@/lib/sanitize';
import { logger } from '@/lib/logger';

const inquirySchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(255),
    phone: z.string().max(20).optional(),
    message: z.string().min(5).max(2000),
    propertyId: z.string().max(100),
    propertyTitle: z.string().max(200),
});

export async function POST(request: Request) {
    try {
        // CSRF Protection
        const csrfError = validateCsrf(request);
        if (csrfError) return csrfError;

        // Content-Type validation
        const contentTypeError = validateContentType(request);
        if (contentTypeError) return contentTypeError;

        // Rate limiting: 10 requests per minute (higher for property inquiries)
        const rateLimitError = rateLimit(request, {
            maxRequests: 10,
            windowMs: 60 * 1000,
            message: 'Too many property inquiries. Please try again in a minute.',
        });
        if (rateLimitError) return rateLimitError;

        const body = await request.json();
        const validatedData = inquirySchema.parse(body);

        // Sanitize all user input to prevent XSS
        const sanitizedData = {
            name: sanitizeForEmail(validatedData.name),
            email: sanitizeForEmail(validatedData.email),
            phone: validatedData.phone
                ? sanitizeForEmail(validatedData.phone)
                : 'Not provided',
            message: sanitizeForEmail(validatedData.message),
            propertyId: sanitizeForEmail(validatedData.propertyId),
            propertyTitle: sanitizeForEmail(validatedData.propertyTitle),
        };

        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A3B28;">New Property Inquiry</h2>
        <div style="background-color: #e8f4f0; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
          <p style="margin: 0;"><strong>Property:</strong> ${sanitizedData.propertyTitle}</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">ID: ${sanitizedData.propertyId}</p>
        </div>

        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Phone:</strong> ${sanitizedData.phone}</p>

        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p><strong>Message:</strong></p>
          <p>${sanitizedData.message}</p>
        </div>
      </div>
    `;

        const success = await sendEmail({
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER || '',
            subject: `Inquiry for: ${sanitizedData.propertyTitle}`,
            html: htmlContent,
        });

        if (!success) {
            logger.error('Email sending failed for property inquiry');
            return NextResponse.json(
                { error: 'Failed to send your inquiry. Please try again later.' },
                { status: 500 }
            );
        }

        logger.info('Property inquiry submitted successfully', {
            propertyId: validatedData.propertyId,
        });

        return NextResponse.json(
            { message: 'Inquiry sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            logger.warn('Property inquiry validation failed', { errors: error.issues });
            return NextResponse.json(
                { error: 'Please check your form inputs and try again.' },
                { status: 400 }
            );
        }

        logger.error('Property inquiry submission error', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}
