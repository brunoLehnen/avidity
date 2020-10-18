export class ApplicationError extends Error {
  public code: string;
  public message: string;

  constructor(code: string, message: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApplicationError);
    }

    this.name = 'ApplicationError';
    this.code = code;
    this.message = message;
  }
}

