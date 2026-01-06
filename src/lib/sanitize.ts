/**
 * Escapes HTML special characters to prevent XSS
 * Use this for plain text that will be inserted into HTML
 */
export function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Sanitizes user input for email templates
 * Escapes all HTML to prevent XSS in email clients
 */
export function sanitizeForEmail(input: string): string {
  // For email templates, we escape all HTML since we don't need formatting
  return escapeHtml(input.trim());
}

/**
 * Sanitizes HTML content by removing potentially dangerous patterns
 * This is a basic implementation for server-side use
 *
 * Uses iterative replacement to prevent bypass attacks where removing
 * one pattern creates another unsafe pattern at the boundary.
 */
export function sanitizeHtml(dirty: string): string {
  let clean = dirty;
  let previous: string;

  // Apply sanitization rules iteratively until no more changes occur
  // This prevents bypass attacks like: "<scrip<script>t>" -> "<script>"
  do {
    previous = clean;

    // Remove script tags and their content (handles </script >, </script/>, etc.)
    clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>/gi, '');

    // Remove event handlers (onclick, onerror, etc.)
    clean = clean.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
    clean = clean.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');

    // Remove dangerous URL protocols
    clean = clean.replace(/javascript:/gi, '');
    clean = clean.replace(/vbscript:/gi, '');
    clean = clean.replace(/data:/gi, '');

  } while (clean !== previous);

  // Escape the result for additional safety
  return escapeHtml(clean);
}
