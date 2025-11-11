# Deployment Notes

## Environment Variables Required

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token
```

## Pre-Deployment Checklist

1. **Sanity CMS**
   - [ ] Add actual property data to Sanity Studio at `/studio`
   - [ ] Upload property images
   - [ ] Verify all properties have required fields

2. **Contact Information**
   - [ ] Update WhatsApp number in `src/data/contact.ts`
   - [ ] Update phone numbers
   - [ ] Update email addresses
   - [ ] Update physical addresses

3. **Social Media**
   - [ ] Update social media URLs in `src/components/layout/Footer.tsx`

4. **SEO**
   - [ ] Verify metadata in `src/app/layout.tsx`
   - [ ] Add Open Graph images
   - [ ] Submit sitemap to search engines

## Build & Deploy Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy Sanity Studio
npm run sanity:deploy
```

## Recommended Hosting

- **Frontend**: Vercel (recommended for Next.js)
- **Sanity CMS**: Sanity Cloud (included with Sanity account)

## Post-Deployment

1. Test all forms
2. Verify WhatsApp integration works
3. Test property filters
4. Check mobile responsiveness
5. Verify all images load correctly
6. Test on multiple browsers

---

**Status**: Ready for Production Deployment
