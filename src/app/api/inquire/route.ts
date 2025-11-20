import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';

const inquirySchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    message: z.string().min(5),
    propertyId: z.string(),
    propertyTitle: z.string(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = inquirySchema.parse(body);

        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A3B28;">New Property Inquiry</h2>
        <div style="background-color: #e8f4f0; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
          <p style="margin: 0;"><strong>Property:</strong> ${validatedData.propertyTitle}</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">ID: ${validatedData.propertyId}</p>
        </div>
        
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
        
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p><strong>Message:</strong></p>
          <p>${validatedData.message}</p>
        </div>
      </div>
    `;

        const success = await sendEmail({
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER || '',
            subject: `Inquiry for: ${validatedData.propertyTitle}`,
            html: htmlContent,
        });

        if (!success) {
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Inquiry sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid form data', details: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
