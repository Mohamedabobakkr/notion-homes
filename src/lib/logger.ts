type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
}

/**
 * Structured logger with sensitive data scrubbing
 * Prevents logging of passwords, tokens, and other sensitive information
 */
class Logger {
  private sensitiveKeys = [
    'password',
    'token',
    'secret',
    'apiKey',
    'api_key',
    'accessToken',
    'refreshToken',
    'creditCard',
    'ssn',
    'auth',
    'authorization',
  ];

  /**
   * Scrubs sensitive data from objects before logging
   */
  private scrubSensitiveData(data: unknown): unknown {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.scrubSensitiveData(item));
    }

    const scrubbed: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();
      const isSensitive = this.sensitiveKeys.some((sensitive) =>
        lowerKey.includes(sensitive.toLowerCase())
      );

      if (isSensitive) {
        scrubbed[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        scrubbed[key] = this.scrubSensitiveData(value);
      } else {
        scrubbed[key] = value;
      }
    }

    return scrubbed;
  }

  /**
   * Formats log entry for output
   */
  private formatLog(entry: LogEntry): string {
    const contextStr = entry.context
      ? ` | ${JSON.stringify(this.scrubSensitiveData(entry.context))}`
      : '';
    return `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}${contextStr}`;
  }

  /**
   * Logs an info message
   */
  info(message: string, context?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      context,
    };

    if (process.env.NODE_ENV !== 'test') {
      console.log(this.formatLog(entry));
    }
  }

  /**
   * Logs a warning message
   */
  warn(message: string, context?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'warn',
      message,
      context,
    };

    if (process.env.NODE_ENV !== 'test') {
      console.warn(this.formatLog(entry));
    }
  }

  /**
   * Logs an error message
   */
  error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      context: {
        ...context,
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        } : error,
      },
    };

    if (process.env.NODE_ENV !== 'test') {
      console.error(this.formatLog(entry));
    }
  }

  /**
   * Logs a debug message (only in development)
   */
  debug(message: string, context?: Record<string, unknown>): void {
    if (process.env.NODE_ENV === 'development') {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: 'debug',
        message,
        context,
      };

      console.debug(this.formatLog(entry));
    }
  }
}

// Export singleton instance
export const logger = new Logger();
