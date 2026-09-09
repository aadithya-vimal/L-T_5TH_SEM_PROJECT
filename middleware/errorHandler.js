const ApiError = require('../utils/ApiError');
module.exports = (err, _req, res, _next) => {
  let status = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let code = err.errorCode || 'INTERNAL_SERVER_ERROR';
  if (err.name === 'ValidationError') { status = 400; code = 'VALIDATION_ERROR'; message = Object.values(err.errors).map(e => e.message).join('; '); }
  if (err.name === 'CastError') { status = 400; code = 'INVALID_ID'; message = 'Invalid resource identifier'; }
  if (err.code === 11000) { status = 409; code = 'DUPLICATE_RESOURCE'; message = `Duplicate value for ${Object.keys(err.keyPattern || {}).join(', ')}`; }
  if (process.env.NODE_ENV !== 'test') console.error(err);
  res.status(status).json({ success: false, message, errorCode: code });
};
