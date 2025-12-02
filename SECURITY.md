# Security Enhancements - Notion Homes

## Overview

This document outlines the comprehensive security improvements implemented to protect the Notion Homes application from common web vulnerabilities.

## Fixed Vulnerabilities

### 1. ✅ Cross-Site Scripting (XSS) Prevention

**Status:** FIXED

**Implementation:**
- Created HTML sanitization utility (`src/lib/sanitize.ts`)
- All user input in API routes is now escaped before insertion into email templates
- Prevents malicious script injection in email clients

**Files Modified:**
- `src/lib/sanitize.ts` (new)
- `src/app/api/contact/route.ts`
- `src/app/api/inquire/route.ts`
- `src/app/api/list/route.ts`

### 2. ✅ Rate Limiting

**Status:** FIXED

**Implementation:**
- In-memory rate limiter middleware (`src/lib/rate-limiter.ts`)
- Different limits for different endpoints:
  - Contact form: 5 requests/minute
  - Property inquiries: 10 requests/minute
  - Property listings: 3 requests/hour
- Returns proper 429 status with Retry-After headers
- IP-based tracking using X-Forwarded-For and X-Real-IP headers

**Files Modified:**
- `src/lib/rate-limiter.ts` (new)
- All API routes updated with rate limiting

**Production Note:** For production deployments with multiple servers, replace the in-memory store with Redis or a distributed cache.

### 3. ✅ CSRF Protection

**Status:** FIXED

**Implementation:**
- Origin-based CSRF validation (`src/lib/csrf.ts`)
- Validates request origin matches host
- Content-Type validation for JSON APIs
- Prevents cross-site request forgery attacks

**Files Modified:**
- `src/lib/csrf.ts` (new)
- All POST API routes now validate CSRF

### 4. ✅ Security Headers

**Status:** FIXED

**Implementation:**
- Comprehensive security headers in `next.config.ts`:
  - `Strict-Transport-Security`: Enforces HTTPS
  - `X-Frame-Options`: Prevents clickjacking
  - `X-Content-Type-Options`: Prevents MIME sniffing
  - `Content-Security-Policy`: Restricts resource loading
  - `Referrer-Policy`: Controls referrer information
  - `Permissions-Policy`: Restricts browser features

**Files Modified:**
- `next.config.ts`

### 5. ✅ Input Validation Enhancement

**Status:** FIXED

**Implementation:**
- Added maximum length constraints to all string fields
- Prevents buffer overflow and large payload attacks
- Schema validation with Zod now includes:
  - Min/max length limits
  - Proper type coercion
  - Range validation for numeric fields

**Examples:**
- Name: max 100 characters
- Email: max 255 characters
- Message: max 2000 characters
- Description: max 5000 characters

### 6. ✅ Error Handling & Information Disclosure

**Status:** FIXED

**Implementation:**
- Generic error messages returned to clients
- Detailed errors logged server-side only
- No schema information exposed to attackers
- Structured logging with sensitive data scrubbing

**Files Modified:**
- `src/lib/logger.ts` (new)
- All API routes updated with improved error handling

### 7. ✅ Structured Logging

**Status:** FIXED

**Implementation:**
- Created secure logging utility (`src/lib/logger.ts`)
- Automatically scrubs sensitive data (passwords, tokens, API keys)
- Timestamped log entries with severity levels
- Environment-aware (verbose in dev, minimal in production)

**Files Modified:**
- `src/lib/logger.ts` (new)
- `src/lib/email.ts`

### 8. ⚠️ Dependency Vulnerabilities

**Status:** PARTIALLY FIXED

**Remaining Issues:**
- 8 high severity vulnerabilities in Sanity CLI dependencies
- Related to `glob` package command injection
- Only affects development/build-time, not runtime

**Action Required:**
```bash
# To fix (will update Sanity to v3.95.0 - breaking change):
npm audit fix --force
```

**Risk Assessment:**
- **Low Impact:** Vulnerabilities are in CLI tools, not runtime dependencies
- **Affected:** Only development environment and build process
- **Recommendation:** Update Sanity when convenient, test thoroughly

## Security Features Summary

| Feature | Status | Protection Against |
|---------|--------|---------------------|
| XSS Protection | ✅ Implemented | Script injection, HTML injection |
| Rate Limiting | ✅ Implemented | DoS, spam, abuse |
| CSRF Protection | ✅ Implemented | Cross-site request forgery |
| Security Headers | ✅ Implemented | XSS, clickjacking, MIME sniffing |
| Input Validation | ✅ Enhanced | Buffer overflow, injection |
| Error Handling | ✅ Improved | Information disclosure |
| Structured Logging | ✅ Implemented | Data leaks in logs |
| HTTPS Enforcement | ✅ Configured | Man-in-the-middle attacks |

## Security Best Practices

### For Development

1. **Never commit `.env.local`** - Already gitignored
2. **Use environment variables** for all secrets
3. **Test rate limiting** in staging before production
4. **Review logs regularly** for suspicious activity

### For Production Deployment

1. **Enable HTTPS** on your hosting platform
2. **Configure Redis** for distributed rate limiting (if using multiple servers)
3. **Set up log aggregation** (e.g., CloudWatch, Datadog, Logtail)
4. **Monitor rate limit violations** for potential attacks
5. **Update dependencies regularly**: `npm audit` monthly
6. **Configure CSP** headers based on your actual third-party services

### Environment Variables

Required environment variables (see `.env.local`):
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_EMAIL=your_email@gmail.com
```

## Testing Security Features

### Testing Rate Limiting

```bash
# Test contact form rate limit (should block after 5 requests)
for i in {1..7}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","phone":"1234567890","message":"Test message"}'
  echo ""
done
```

### Testing XSS Protection

Try submitting forms with XSS payloads (should be escaped):
```javascript
{
  "name": "<script>alert('xss')</script>",
  "email": "test@test.com",
  "phone": "1234567890",
  "message": "<img src=x onerror='alert(1)'>"
}
```

All malicious code should be escaped in the email output.

### Testing CSRF Protection

Try making requests from a different origin (should be blocked):
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -H "Origin: https://evil-site.com" \
  -d '{"name":"Test","email":"test@test.com","phone":"1234567890","message":"Test"}'
```

Should return 403 Forbidden.

## Security Monitoring

### Log Patterns to Monitor

Watch for these patterns in production logs:

1. **Rate limit violations**
   - Pattern: `429` status codes
   - Action: Investigate IP, consider blocking if persistent

2. **CSRF validation failures**
   - Pattern: `403` with "CSRF validation failed"
   - Action: May indicate attack attempt

3. **Validation errors**
   - Pattern: Frequent `400` errors from same IP
   - Action: Could be automated attack probing

4. **Email sending failures**
   - Pattern: `Failed to send email`
   - Action: Check SMTP configuration

## Reporting Security Issues

If you discover a security vulnerability, please email security@notionhomes.com (or your designated security contact) instead of creating a public issue.

## Changelog

### 2025-12-02
- ✅ Implemented XSS protection across all API routes
- ✅ Added rate limiting middleware
- ✅ Implemented CSRF protection
- ✅ Added comprehensive security headers
- ✅ Enhanced input validation with length limits
- ✅ Improved error handling
- ✅ Implemented structured logging
- ⚠️ Partially fixed dependency vulnerabilities (8 Sanity CLI issues remain)

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
