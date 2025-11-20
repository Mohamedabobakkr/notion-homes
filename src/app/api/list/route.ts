import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';

const listingSchema = z.object({
    ownerName: z.string().min(2),
    ownerEmail: z.string().email(),
    ownerPhone: z.string().min(10),
    propertyTitle: z.string().min(5),
    propertyType: z.string(),
    listingType: z.string(),
    location: z.string(),
    address: z.string().min(5),
    bedrooms: z.coerce.number().min(1),
    bathrooms: z.coerce.number().min(1),
    size: z.coerce.number().min(1),
    priceGBP: z.coerce.number().min(1),
    priceEGP: z.coerce.number().optional(),
    description: z.string().min(50),
    features: z.string(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validatedData = listingSchema.parse(body);

        const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A3B28;">New Property Listing Submission</h2>
        
        <h3 style="color: #DBC086; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Owner Information</h3>
        <p><strong>Name:</strong> ${validatedData.ownerName}</p>
        <p><strong>Email:</strong> ${validatedData.ownerEmail}</p>
        <p><strong>Phone:</strong> ${validatedData.ownerPhone}</p>

        <h3 style="color: #DBC086; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 20px;">Property Details</h3>
        <p><strong>Title:</strong> ${validatedData.propertyTitle}</p>
        <p><strong>Type:</strong> ${validatedData.propertyType}</p>
        <p><strong>Listing For:</strong> ${validatedData.listingType}</p>
        <p><strong>Location:</strong> ${validatedData.location}</p>
        <p><strong>Address:</strong> ${validatedData.address}</p>
        
        <div style="display: flex; gap: 20px;">
          <p><strong>Bedrooms:</strong> ${validatedData.bedrooms}</p>
          <p><strong>Bathrooms:</strong> ${validatedData.bathrooms}</p>
          <p><strong>Size:</strong> ${validatedData.size} sqm</p>
        </div>
        
        <p><strong>Price (GBP):</strong> £${validatedData.priceGBP.toLocaleString()}</p>
        ${validatedData.priceEGP ? `<p><strong>Price (EGP):</strong> EGP ${validatedData.priceEGP.toLocaleString()}</p>` : ''}

        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p><strong>Description:</strong></p>
          <p>${validatedData.description}</p>
          <p><strong>Features:</strong></p>
          <p>${validatedData.features}</p>
        </div>
      </div>
    `;

        const success = await sendEmail({
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER || '',
            subject: `New Property Listing: ${validatedData.propertyTitle}`,
            html: htmlContent,
        });

        if (!success) {
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Listing submitted successfully' },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid form data', details: error.issues },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
