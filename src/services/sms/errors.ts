export class SMSError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'SMSError';
  }
}

export class ValidationError extends SMSError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class NetworkError extends SMSError {
  constructor(message: string) {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}