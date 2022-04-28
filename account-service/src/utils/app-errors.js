const STATUS_CODES = require('./status-codes');

class AppError extends Error {
  constructor(name, statusCode, description, isOperational, errorStack, loggingErrorResponse) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = loggingErrorResponse;
    Error.captureStackTrace(this);
  }
}

// Specific API error
class APIError extends AppError {
  constructor(name, statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR, description = 'Internal Server Error', isOperational = true) {
    super(name, statusCode, description, isOperational);
  }
}

// 400
class BadRequestError extends AppError {
  constructor(description = 'Bad Request', loggingErrorResponse) {
    super('NOT FOUND', STATUS_CODES.BAD_REQUEST, description, true, false, loggingErrorResponse);
  }
}

// 400
class ValidationError extends AppError {
  constructor(description = 'ValidationError', errorStack) {
    super('BAD_REQUEST', STATUS_CODES.BAD_REQUEST, description, true, errorStack);
  }
}

module.exports = {
  AppError,
  APIError,
  BadRequestError,
  ValidationError,
}

