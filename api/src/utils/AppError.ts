export class AppError extends Error {
  statusCode: number;
  data: Record<string, unknown> | undefined; // Initialize `data` with a default value

  constructor(statusCode: number, message: string, data?: Record<string, unknown>, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.data = data; // Assign `data` directly, as it's nullish by default

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
