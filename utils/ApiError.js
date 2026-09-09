class ApiError extends Error {
  constructor(statusCode, message, errorCode = 'API_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;
  }
}
module.exports = ApiError;
