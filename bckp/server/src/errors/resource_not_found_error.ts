export class ResourceNotFoundError extends Error {
  public code: string;
  public message: string;

  constructor(message: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ResourceNotFoundError);
    }

    this.name = 'ResourceNotFoundError';
    this.code = 'RESOURCE_NOT_FOUND';
    this.message = message;
  }
}

