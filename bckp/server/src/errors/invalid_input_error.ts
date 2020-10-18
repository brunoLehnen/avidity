export class InvalidInputError extends Error {
  public code: string;
  public message: string;

  constructor(message: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidInputError);
    }

    this.name = 'InvalidInputError';
    this.code = 'INVALID_INPUT';
    this.message = message;
  }
}

