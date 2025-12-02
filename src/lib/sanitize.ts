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
 */
export function sanitizeHtml(dirty: string): string {
  // Remove script tags and their content
  let clean = dirty.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove event handlers (onclick, onerror, etc.)
  clean = clean.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  clean = clean.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');

  // Remove javascript: protocol
  clean = clean.replace(/javascript:/gi, '');

  // Remove data: protocol (can be used for XSS)
  clean = clean.replace(/data:text\/html/gi, '');

  // Escape the result for additional safety
  return escapeHtml(clean);
}
